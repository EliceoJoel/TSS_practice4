import React from 'react';
import './Informacion.css';
import { Layout } from 'antd';

const { Content } = Layout;

export default function Informacion(properties) {

  const { informacion } = properties;

  return (
    <Layout style={{ padding: '24px' }}>
      <Content
        className="panel-information panel-content"
      >
        {'Selecciona ' + informacion}
      </Content>
    </Layout>
  )
}
