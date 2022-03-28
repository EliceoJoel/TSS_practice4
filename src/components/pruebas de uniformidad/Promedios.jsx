import { Layout, Form, Button, Row, Col, Space } from 'antd';
import { useState } from 'react';
import NumericInput from './components/NumericInput';

const { Content } = Layout;

export default function Promedios(properties) {
  const [form] = Form.useForm();
  const [numberValue, setNumberValue] = useState("");
  const [pseudoNumbers, setPseudoNumbers] = useState([]);
  const [alpha, setAlpha] = useState("");
  const [estadistico, setEstadistico] = useState("");


  const onFinish = (values) => {
    const { numberValue } = values;
    if (numberValue !== undefined) {
      setPseudoNumbers([...pseudoNumbers, numberValue]);
    } else {
      alert("Ingrese numeros");
    }
    form.resetFields();
  };

  function onChangeNumberValue(value) {
    setNumberValue(value);
  }

  function onChangeAlphaValue(value) {
    setAlpha(value);
    setEstadistico("");
  }

  function onChangeEstadisticoValue(value) {
    setEstadistico(value);
  }

  function getMedium() {
    const totalSum = pseudoNumbers.reduce((previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue), 0);
    return pseudoNumbers.length !== 0
      ? totalSum / parseFloat(pseudoNumbers.length)
      : 0;
  }

  function getEstadistico() {
    return ((1 / 2 - getMedium()) * Math.sqrt(parseFloat(pseudoNumbers.length))) / Math.sqrt(1 / 12);
  }

  function getAlphavalueHtml() {
    console.log(alpha)
    if (alpha === "") {
      return (<strong>Introduce un nivel de significancia</strong>);
    } else {
      return (<strong>{`a = ${alpha}% = ` + parseFloat(alpha) / 100}</strong>);
    }
  }

  function getConclusion() {
    if ((Math.abs(getEstadistico())) < parseFloat(estadistico)) {
      return 'No se puede rechazar la hipotesis de que los numeros pseudoaleatorios provienen de un universo uniforme';
    } else {
      return 'Se puede rechazar la hipotesis de que los numeros pseudoaleatorios provienen de un universo uniforme'
    }
  }

  return (
    <Layout style={{ padding: '24px' }}>
      <Content className="panel-promedios panel-content" style={{ padding: '24px' }}>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="numberValue"
          >
            <NumericInput
              style={{ width: 200 }}
              value={numberValue}
              onChange={onChangeNumberValue}
              placeholder="Ingresa un numero"
            />
          </Form.Item>
          <Space size={100}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Agregar
              </Button>
            </Form.Item>
            <Form.Item label={'a'}>
              <NumericInput
                value={alpha}
                onChange={onChangeAlphaValue}
                placeholder="Nivel de significancia"
              />
            </Form.Item>
          </Space>
        </Form>
        <br />

        <div className='number-list'>
          <Row gutter={[8, 8]}>
            {pseudoNumbers.map((number, index) => (
              <Col span={2} key={index}>
                <div className='number-value'>{number}</div>
              </Col>
            ))}
          </Row>
        </div>
        <br />
        {
          pseudoNumbers.length !== 0 ? (
            <>
              <div>
                <p>El promedio es: <strong>{getMedium()}</strong></p>
              </div>
              <br />
              <div>
                <p>Dado que:</p>
                <strong>{'u = 1/2'}</strong>
                <br />
                <strong>{'o = raiz(1/12)'}</strong>
              </div>
              <br />
              <div>
                <p>Entonces:</p>
                <strong>{`Zo = ${getEstadistico()}`}</strong>
              </div>
              <br />
              {
                alpha !== "" ? (
                  <>
                    <div>
                      <p>El nivel de significancia es: {getAlphavalueHtml()}</p>
                    </div>
                    <div>
                      <p>Entonces:</p>
                      <strong>{`Z a/2 = Z ${parseFloat(alpha) / 100}/2 = Z ${(parseFloat(alpha) / 100) / 2}`}</strong>
                    </div>
                    <br />
                    <div>
                      <p>Busca el valor de x en la tabla 'Tabla D.5: ÁREAS BAJO LA CURVA NORMAL ESTÁNDAR'
                        <a href='https://drive.google.com/file/d/1jHcGkvK9_SNG_ybp7oikQviFw-MxpSJj/view?usp=sharing' target={"_blank"} rel="noreferrer">
                          &nbsp;AQUI&nbsp;
                        </a>
                        en base al valor <strong>{(parseFloat(alpha) / 100) / 2}</strong>
                      </p>
                    </div>
                    <Form.Item label="Valor de x de la tabla">
                      <NumericInput
                        style={{ width: 200 }}
                        value={estadistico}
                        onChange={onChangeEstadisticoValue}
                        placeholder="Introduce el valor de x"
                      />
                    </Form.Item>
                    {estadistico !== "" ? (
                      <>
                        <div>
                          <p>{'|Zo| < Z a/2'}</p>
                          <strong>{`${Math.abs(getEstadistico())} < ${estadistico}`}</strong>
                        </div>
                        <br />
                        <div>
                          <p>Por lo tanto: <strong>{getConclusion()}</strong></p>
                        </div>
                      </>
                    ) : <></>
                    }
                  </>
                )
                  : <></>
              }
            </>
          ) : <></>
        }
      </Content>
    </Layout>
  )
}