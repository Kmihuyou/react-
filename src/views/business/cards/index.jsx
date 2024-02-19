// import React, { useState } from "react";
// import { Input, Button } from "antd";
// import {
//   SearchOutlined,
//   RedoOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// const Cards = () => {
//   const [datainput, setDatainput] = useState([]);
//   return (
//     <div>
//       <div>
//         <span>卡号:</span>
//         <Input
//           className="w-[200px] ml-[20px]"
//           value={datainput}
//           onChange={(e) => setDatainput(e.target.value)}
//         />
//         <Button
//           type="primary"
//           className="mx-[10px]"
//           danger
//           icon={<SearchOutlined />}
//           onClick={() => {}}
//         >
//           搜索
//         </Button>

//         <Button onClick={() => {}} icon={<RedoOutlined />}>
//           重置
//         </Button>
//       </div>
//       <div className="mt-[20px] mb-[10px] flex">
//         <Button
//           type="primary"
//           danger
//           ghost
//           className="ml-[10px]"
//           icon={<DeleteOutlined />}
//         >
//           解绑
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Cards;

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
import { getcardlist, deletecards } from "@/service/index";
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
const Cards = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [datainput, setDatainput] = useState([]);
  const isEditing = (record) => record.key === editingKey;
  // const valueinput = ''
  // 编译表格
  const getcards = (search = "") => {
    setLoading(true);
    getcardlist({ Bodypart: search, pageSize: 99 })
      .then((res) => {
        console.log(res.data.data.result);
        // const Data = res.data.data.result.map((item, index) => {
        //   return {
        //     key: item.id,
        //     name: item.bodypart,
        //     num: item.orderNum,
        //     address: item.create_time,
        //   };
        // });
        // setData(Data);
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
    deletecards(key).catch((res) => {
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
      width: "11%",
      editable: true,
    },
    {
      title: "卡号",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "卡类型",
      dataIndex: "name",
      width: "11%",
      editable: true,
    },
    {
      title: "用户ID",
      dataIndex: "num",
      width: "11%",
      editable: true,
    },
    {
      title: "绑定时间",
      dataIndex: "address",
      width: "20%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "20%",
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
                解绑
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
    getcards();
    // console.log(originData);
  }, []);

  return (
    <div>
      <div>
        <span>卡号:</span>
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
          onClick={() => {}}
        >
          搜索
        </Button>

        <Button onClick={() => {}} icon={<RedoOutlined />}>
          重置
        </Button>
      </div>
      <div className="mt-[20px] mb-[10px] flex">
        <Button
          type="primary"
          danger
          ghost
          className="ml-[10px]"
          icon={<EditOutlined />}
        >
          解绑
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

export default Cards;
