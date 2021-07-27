import React, { Fragment, useCallback, useRef, useState } from "react";
import { Button, Col, Row } from "antd";
import { RedoOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {}
const Counter: React.FC<Props> = () => {
  const [counter, setCounter] = useState(0);
  const _counter = useRef(counter);

  const handleClick = useCallback(() => {
    _counter.current++;
    setCounter(_counter.current);
  }, []);

  const handleReset = useCallback(() => {
    _counter.current = 0;
    setCounter(0);
  }, []);

  return (
    <Fragment>
      <Row justify="space-around" align="middle">
        <Col span={6}>
          <span>Count: </span>
          <span style={{ fontWeight: "bolder", fontSize: 24 }}>{counter}</span>
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={6}>
          <Button
            icon={<RedoOutlined />}
            shape="circle"
            onClick={handleReset}
            size="large"
            style={{ marginRight: 16 }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={handleClick}
            size="large"
          />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Counter;
