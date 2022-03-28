import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Uniformidad() {
  return (
    <Layout>
        <Sider style={{backgroundColor: 'white'}}>
          <Menu mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <span>Promedios</span>
              <Link to="/uniformidad/promedios" />
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              <span>Frecuencia</span>
              <Link to="/uniformidad/frecuencia" />
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              <span>Kolmogorov Smirnov</span>
              <Link to="/uniformidad/kolmogorov-smirnov" />
            </Menu.Item>
          </Menu>
        </Sider>
      <Outlet />
    </Layout>
  );
}

