import React, { Fragment, useCallback } from "react";
import { batch } from "react-redux";
import { Button, Col, Row, Typography } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { actions } from "./reducer";

interface Props {}

const Header: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const handleAdd = useCallback(() => {
    batch(() => {
      dispatch(actions.setOpenModalAdd(true));
      dispatch(actions.setModalValues({}));
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Row justify="space-around" className="employees-header">
        <Col span={12} className="title">
          <Typography.Title level={3}>Employees</Typography.Title>
        </Col>
        <Col span={12} className="action">
          <Button type="primary" onClick={handleAdd}>
            Add Employee
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Header;
