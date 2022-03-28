import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Independencia() {
  return (
    <Layout>
        <Sider style={{backgroundColor: 'white'}}>
          <Menu mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <span>Series</span>
              <Link to="/independencia/series" />
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              <span>Poker</span>
              <Link to="/independencia/poker" />
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              <span>Huecos</span>
              <Link to="/independencia/huecos" />
            </Menu.Item>
          </Menu>
        </Sider>
      <Outlet />
    </Layout>
  );
}

