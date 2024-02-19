import React, { useState, useEffect } from "react";
import { Input, Button, Select, Space, Table, Tag, message } from "antd";
import { SearchOutlined, RedoOutlined, PlusOutlined } from "@ant-design/icons";
import { getDelete, getdepts, getdept } from "@/service/index";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const Dept = () => {
  const [datainput, setDatainput] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const getcards = (search = "") => {
    setLoading(true);
    getdept()
      .then((res) => {
        getdepts().then((res) => {
          setDatas(res.data.data);
        });
        setData(res.data.data);
      })
      .finally(() => setLoading(false));
  };
  // 下拉列表部门
  function addUniqueKeyToObjects(arr, parentKey = "") {
    return arr.map((item, index) => {
      // 生成当前对象的唯一key，基于id和父级key（如果有的话）
      const key = parentKey ? `${parentKey}-${item.id}` : item.id.toString();
      // 如果是对象并且包含children属性，递归处理children
      if (
        typeof item === "object" &&
        item !== null &&
        Array.isArray(item.children)
      ) {
        item.children = addUniqueKeyToObjects(item.children, key);
      }
      // 添加或覆盖key属性
      item.deptName = item.label;
      item.key = key;
      delete item.label;
      return item;
    });
  }
  const datakey = addUniqueKeyToObjects(datas);

  data.forEach((obj2) => {
    const obj1 = datakey.find((obj1) => obj1.id === obj2.deptId);
    if (obj1) {
      obj2.children = obj1.children;
    }
  });
  // 给数组加给key
  data.forEach((Item) => {
    Item.key = Item.deptId;
  });
  console.log(datas);
  console.log(data);
  // 删除
  const info = (data) => {
    messageApi.info(data);
  };
  const handleDelete = (key) => {
    getDelete(key).then((res) => {
      info(res.data.msg);
    });
    setData(data);
    // const newData = data.filter((item) => item.key !== key);
    // setData(newData);
  };

  const columns = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "负责人",
      dataIndex: "leader",
      key: "leader",
      width: "12%",
    },
    {
      title: "排序",
      dataIndex: "key",
      key: "key",
      width: "12%",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "12%",
      // status: ["nice", "developer"],
      render: (_, record) => {
        if (record.status === "0") {
          return <Tag color="success">正常</Tag>;
        } else if (record.status !== "0") {
          return <Tag color="error">停用</Tag>;
        }
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: "12%",
    },
    {
      title: "操作",
      dataIndex: "address",
      width: "30%",
      key: "address",
      render: (_, record) => {
        return (
          <Space size="middle">
            <span>编译</span>
            <span
              onClick={() => {
                getdepts().then((res) => {
                  console.log(res);
                });
              }}
            >
              新增
            </span>
            <span
              className="text-[#ff4793]"
              onClick={() => {
                handleDelete(record.key);
              }}
            >
              删除
            </span>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    getcards();
  }, []);
  return (
    <div>
      {contextHolder}
      <div>
        <span>部门名称</span>
        <Input
          className="w-[200px] mx-[20px]"
          value={datainput}
          placeholder="请输入部门名称"
          onChange={(e) => setDatainput(e.target.value)}
        />
        <span>状态</span>
        <Select
          className="mx-[10px]"
          showSearch
          style={{
            width: 100,
          }}
          placeholder="部门状态"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "正常",
            },
            {
              value: "2",
              label: "异常",
            },
          ]}
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
          icon={<PlusOutlined />}
        >
          新增
        </Button>
      </div>
      {/* <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      > */}
      {/* CheckStrictly:{" "} */}
      {/* <Switch checked={checkStrictly} onChange={setCheckStrictly} /> */}
      {/* </Space> */}
      <Table
        // showHeader={false}
        loading={loading}
        columns={columns}
        rowSelection={{
          ...rowSelection,
          // checkStrictly,
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Dept;
