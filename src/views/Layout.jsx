import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menu = JSON.parse(localStorage.getItem("user_menus"));
  console.log(menu);
  // label, key, children
  let i = 1;
  const items = (menu) => {
    let itemsarr = [];
    menu.forEach((item, index) => {
      // console.log(index);
      itemsarr.push({
        label: item.meta.title,
        key: i++,
        children: item.children ? items(item.children) : null,
      });
      // console.log(item.meta.title);
      // item;
    });
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
        ></Content>
      </Layout>
    </Layout>
  );
};
export default App;
