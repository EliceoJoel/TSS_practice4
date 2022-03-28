import { Layout, Form, Button, Row, Col, Space } from 'antd';
import { useState } from 'react';
import NumericInput from './components/NumericInput';

const { Content } = Layout;

export default function Frecuencia(properties) {
  const [form] = Form.useForm();
  const [numberValue, setNumberValue] = useState("");
  const [pseudoNumbers, setPseudoNumbers] = useState([]);
  const [alpha, setAlpha] = useState("");
  const [ka, setKa] = useState("");
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

  function onChangeKaValue(value) {
    setKa(value);
    setEstadistico("");
  }

  function onChangeEstadisticoValue(value) {
    setEstadistico(value);
  }

  function getFE() {
    return parseFloat(pseudoNumbers.length) / parseFloat(ka);
  }

  function getEstadistico() {
    const intervalosValues = getIntervaloObjects();
    const result = intervalosValues.reduce(function(prev, curr){
      return prev + (Math.pow((curr.valores.length - getFE()), 2) / getFE());
    }, 0);
    return result;
  }

  function getIntervaloObjects() {
    const intervalo = 1 / ka;
    let resultado = [];
    for (let index = 0; index < ka; index++) {
      const inicioValue = index === 0 ? 0 : resultado[index - 1].fin;
      const finValue = index === 0 ? intervalo : resultado[index - 1].fin + intervalo;
      const conjuntoDevalores = {
        inicio: inicioValue,
        fin: finValue,
        valores: pseudoNumbers.filter(number => number > inicioValue && number <= finValue)
      }
      resultado.push(conjuntoDevalores);
    }
    return resultado;
  }

  function getIntervaloGrafic() {
    const intervalos = getIntervaloObjects();
    return (
      <>
        {
          intervalos.map((intervalo, index) => (
            <Col span={2} key={index}>
              <div className='intervalo'>
                <p>{`(${intervalo.inicio.toFixed(2)} - ${intervalo.fin.toFixed(2)}]`}</p>
              </div>
              <div className='valores'>
                {
                  intervalo.valores.map((valor, index) => (
                    <p key={index} style={{ textAlign: 'center' }}>{valor}</p>
                  ))
                }
              </div>
            </Col>
          ))
        }
      </>
    )
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
            <Form.Item label={'k'}>
              <NumericInput
                value={ka}
                onChange={onChangeKaValue}
                placeholder="Numero de subintervalos"
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
          alpha !== "" && ka !== "" ? (
            <>
              <div>
                <p>FE = <strong>{getFE()}</strong></p>
              </div>
              <div className='grafica-intervalos'>
                <p>La grafica de intervalos queda queda asi:</p>
                <Row gutter={[8, 8]}>
                  {getIntervaloGrafic()}
                </Row>
              </div>
              <div>
                <p>Entonces:</p>
                <p>{'(Xo)^2 = '}<strong>{getEstadistico()}</strong></p>
              </div>
              <div>
                <p>Siendo:</p>
                <p>{`a = ${alpha / 100}`} y {`k-1 = ${ka - 1}`}</p>
                <p>{'(Xa)^2, k-1 = '}<strong>{`(X${alpha / 100})^2, ${ka}-1 `}</strong>=<strong>{` (X${alpha / 100})^2, ${ka - 1}`}</strong></p>
              </div>
              <br />
              <div>
                <p>Busca un valor en la tabla 'Valores criticos para la distribucion X^2'
                  <a href='https://drive.google.com/file/d/1jHcGkvK9_SNG_ybp7oikQviFw-MxpSJj/view?usp=sharing' target={"_blank"} rel="noreferrer">
                    &nbsp;AQUI&nbsp;
                  </a>
                  en base a grados de libertad = <strong>{ka - 1}</strong> y en la columna con valor = <strong>{alpha / 100}</strong>
                </p>
              </div>
              <Form.Item label="Valor encontrado en la tabla">
                <NumericInput
                  style={{ width: 200 }}
                  value={estadistico}
                  onChange={onChangeEstadisticoValue}
                  placeholder="Introduce el valor encontrado" />
              </Form.Item>
              {estadistico !== "" ? (
                <>
                  <div>
                    <p>{'(Xo)^2 < (Xa)^2, k-1'}</p>
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
      </Content>
    </Layout>
  )
}