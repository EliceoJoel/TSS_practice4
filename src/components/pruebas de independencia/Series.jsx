import { Layout } from 'antd';

const { Content } = Layout;

export default function Series(properties) {

  return (
    <Layout style={{ padding: '24px' }}>
      <Content className="panel-promedios panel-content">
        Series
      </Content>
    </Layout>
  )
}