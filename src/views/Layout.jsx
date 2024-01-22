import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const App = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menu = JSON.parse(localStorage.getItem("user_menus"));
  console.log(menu);
  // label, key, children

  const items = (arr) => {
    let itemsarr = [];
    for (let i = 0; i < arr.length; i++) {
      itemsarr.push({
        label: arr[i].meta.title,
        key: arr[i].path,
        children: arr[i].children ? items(arr[i].children) : null,
      });
    }
    // menu.forEach((item) => {
    //   // console.log(index);
    //   itemsarr.push({
    //     label: item.meta.title,
    //     key: item.path,
    //     children: item.children ? items(item.children) : null,
    //   });
    //   // console.log(item.meta.title);
    //   // item;
    // });
    return itemsarr;
  };
  const cc = items(menu);
  console.log(cc);
  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={cc}
          onClick={(e) => {
            if (e.keyPath[0].includes("/")) {
              e.keyPath[0] = e.keyPath[0].slice(1);
            }
            console.log(e);
            navigate(e.keyPath.reverse().join("/"));
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          主页
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
