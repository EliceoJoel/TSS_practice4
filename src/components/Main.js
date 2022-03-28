import * as React from 'react';
import './Main.css'
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function Main() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <span>Pruebas de uniformidad</span>
            <Link to="/uniformidad" />
          </Menu.Item>
          <Menu.Item key="2">
            <span>Pruebas de Independencia</span>
            <Link to="/independencia" />
          </Menu.Item>
        </Menu>
      </Header>
      <Outlet />
    </Layout>
  );
}