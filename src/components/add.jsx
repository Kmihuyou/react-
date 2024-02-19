import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { addbody } from "@/service/index";
const Add = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("");
  const [parts, setParts] = useState("");
  const [sort, setSort] = useState(0);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // setModalText("");
    setConfirmLoading(true);
    setTimeout(() => {
      addbody({ bodypart: parts, orderNum: sort }).then((res) => {
        console.log(res);
        props.getbody();
      });
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Button onClick={showModal} icon={<PlusOutlined />}>
        新增
      </Button>
      <Modal
        title="添加"
        open={open}
        onOk={handleOk}
        okText={"确认"}
        cancelText={"取消"}
        okType="default"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            onFinish={handleOk}
          >
            <Form.Item
              label="部位"
              name="username"
              rules={[
                {
                  required: true,
                  message: "不能为空",
                },
              ]}
            >
              <Input value={parts} onChange={(e) => setParts(e.target.value)} />
            </Form.Item>
            <Form.Item label="排序ID" name="userid">
              <div className="flex w-[200px]">
                <Button
                  onClick={() => setSort(sort - 1)}
                  icon={<MinusOutlined />}
                ></Button>
                <Input value={sort} onChange={(e) => setSort(e.target.value)} />
                <Button
                  onClick={() => setSort(sort + 1)}
                  icon={<PlusOutlined />}
                ></Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Add;
