import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Table,
  Form,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import {
  SearchOutlined,
  RedoOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { getBodypartslist, elletebody } from "@/service/index";
import Add from "@/components/add";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Config = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [datainput, setDatainput] = useState([]);
  const isEditing = (record) => record.key === editingKey;
  // const valueinput = ''
  // 编译表格
  const getbody = (search = "") => {
    setLoading(true);
    getBodypartslist({ Bodypart: search, pageSize: 99 })
      .then((res) => {
        // console.log(res.data.data.result);
        const Data = res.data.data.result.map((item, index) => {
          return {
            key: item.id,
            name: item.bodypart,
            num: item.orderNum,
            address: item.create_time,
          };
        });
        setData(Data);
      })
      .finally(() => setLoading(false));
  };
  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      name: "",
      num: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  //取消
  const cancel = () => {
    setEditingKey("");
  };
  // 删除
  const handleDelete = (key) => {
    console.log(key);
    elletebody(key).catch((res) => {
      console.log(res);
    });
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      width: "10%",
      editable: true,
    },
    {
      title: "部位",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "排序ID",
      dataIndex: "num",
      width: "15%",
      editable: true,
    },
    {
      title: "添加时间",
      dataIndex: "address",
      width: "25%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <CheckCircleOutlined />
              保存
            </Typography.Link>
            <Popconfirm
              className=" text-red-500 hover:-text-red-700"
              title="要取消么?"
              okText="Yes"
              okType="default"
              cancelText="No"
              onConfirm={cancel}
            >
              <CloseCircleOutlined />
              取消
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link>
            <span
              className="hover:text-orange-400"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <EditOutlined />
              编译
            </span>
            <span className="ml-[10px] hover:text-orange-400">
              <DeleteOutlined />
              <Popconfirm
                title="要删除么?"
                okText="Yes"
                okType="default"
                cancelText="No"
                onConfirm={() => handleDelete(record.key)}
              >
                删除
              </Popconfirm>
            </span>
          </Typography.Link>
        );
      },
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "num" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(() => {
    getbody();
    // console.log(originData);
  }, []);

  return (
    <div>
      <div>
        <span>部位:</span>
        <Input
          className="w-[200px] ml-[20px]"
          value={datainput}
          onChange={(e) => setDatainput(e.target.value)}
        />
        <Button
          type="primary"
          className="mx-[10px]"
          danger
          icon={<SearchOutlined />}
          onClick={() => getbody(datainput)}
        >
          搜索
        </Button>

        <Button onClick={() => getbody()} icon={<RedoOutlined />}>
          重置
        </Button>
      </div>
      <div className="mt-[20px] mb-[10px] flex">
        <Add getbody={getbody} />
        {/* <Button className="mr-[10px]" icon={<PlusOutlined />}>
          新增
        </Button> */}
        <Button className="ml-[10px]" icon={<EditOutlined />}>
          修改
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          loading={loading}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default Config;
