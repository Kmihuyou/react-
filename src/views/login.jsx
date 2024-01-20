import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { sysLogin, getRouters } from "../service/index";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import generateRoutes from "@/router/router.dynamic";
const Login = () => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    sysLogin({
      username: values.username,
      password: values.password,
    }).then((res) => {
      console.log(res);
      //localStorage  token: 名称  将登录的令牌存储到本地页面
      localStorage.token = res.data.data;
      getRouters().then((res) => {
        // 在发送请求时使用登录的令牌访问路由
        // 需要使用请求连接器在发送请求时传递登录保存的令牌进行访问
        console.log(res.data.data);
        localStorage.setItem("user_menus", JSON.stringify(res.data.data));
        navigate("/system");
      });
    });

    // 登录成功后跳转到首页
  };
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Form
        name="normal_login"
        className="login-form w-[350px] p-[25px] bg-[#fff]"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入您的账号!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入您的账密码!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-[#1677ff] w-[100%]"
          >
            登录
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
