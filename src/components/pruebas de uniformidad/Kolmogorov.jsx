import { Layout, Form, Button, Row, Col, Space } from 'antd';
import { useState } from 'react';
import NumericInput from './components/NumericInput';

const { Content } = Layout;

export default function Kolmogorov(properties) {
  const [form] = Form.useForm();
  const [numberValue, setNumberValue] = useState("");
  const [pseudoNumbers, setPseudoNumbers] = useState([]);
  const [alpha, setAlpha] = useState("");
  const [estadistico, setEstadistico] = useState("");


  const onFinish = (values) => {
    const { numberValue } = values;
    if (numberValue !== undefined) {
      const listaOrdenada = [...pseudoNumbers, numberValue];
      setPseudoNumbers(listaOrdenada.sort((a, b) => a - b));
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


  function getFll() {
    let fll = "";
    for (let index = 1; index <= pseudoNumbers.length; index++) {
      fll += index + "/" + pseudoNumbers.length + " ; ";
    }
    return fll.slice(0, -1);
  }

  function getEstadistico() {
    const results = [];
    pseudoNumbers.forEach(function (value, index) {
      let result = ((index + 1) / pseudoNumbers.length) - value;
      results.push(result);
    });
    return Math.abs(Math.max(...results).toFixed(2));
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
        {pseudoNumbers.length !== 0 ? (
          <>
            <div>
              <p>Muestra ordenada F^ll: </p>
            </div>
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
          </>
        ) : <></>}
        {
          alpha !== "" ? (
            <>
              <div>
                <p>Entonces F^l es:</p>
                <p>{getFll()}</p>
              </div>
              <br />
              <div>
                <p>Estadistico:</p>
                <strong>{`Dn(max) = ${getEstadistico()}`}</strong>
              </div>
              <br />
              {
                alpha !== "" ? (
                  <>
                    <div>
                      <p>El nivel de significancia es: {getAlphavalueHtml()}</p>
                    </div>
                    <br />
                    <div>
                      <p>Busca el valor de x en la tabla 'Valores críticos de la prueba de Kolmogorov-Smirnov'
                        <a href='https://drive.google.com/file/d/1jHcGkvK9_SNG_ybp7oikQviFw-MxpSJj/view?usp=sharing' target={"_blank"} rel="noreferrer">
                          &nbsp;AQUI&nbsp;
                        </a>
                        en base los valores <strong>grados de libertad = {pseudoNumbers.length}</strong> y <strong>a = {alpha}</strong>
                      </p>
                    </div>
                    <Form.Item label="Valor encontrado en la tabla">
                      <NumericInput
                        style={{ width: 200 }}
                        value={estadistico}
                        onChange={onChangeEstadisticoValue}
                        placeholder="Introduce el valor encontrado"
                      />
                    </Form.Item>
                    {estadistico !== "" ? (
                      <>
                        <div>
                          <p>{`D max < D ${alpha / 100}, ${pseudoNumbers.length}`}</p>
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