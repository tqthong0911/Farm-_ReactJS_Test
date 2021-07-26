import React, { useCallback } from "react";
import { Form, Input, Modal } from "antd";
import isEmpty from "lodash.isempty";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { actions } from "../reducer";
import { selectInitValue, selectIsLoading, selectIsOpen } from "./selector";

interface Props {}

const ModalAdd: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const isOpenModalAdd = useAppSelector(selectIsOpen);
  const initialValues = useAppSelector(selectInitValue);
  const loading = useAppSelector(selectIsLoading);

  const isAdd = isEmpty(initialValues);

  const handleCancel = useCallback(() => {
    dispatch(actions.setOpenModalAdd(false));
  }, [dispatch]);

  const handleSubmit = useCallback(
    (data: typeof initialValues) => {
      const dataPost = {
        ...initialValues,
        ...data,
      };
      dispatch(actions.submitEmployeeAsync(dataPost));
    },
    [dispatch, initialValues]
  );

  if (!isOpenModalAdd) {
    return null;
  }

  return (
    <Modal
      visible
      className={classNames("pb-0", { loading })}
      onCancel={handleCancel}
      title={isAdd ? "Add Employee" : "Edit Employee"}
      okButtonProps={{ htmlType: "submit", form: "modal-form" }}
    >
      <Form
        name="modal-form"
        initialValues={initialValues}
        onFinish={handleSubmit}
        labelCol={{ span: 3 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Position" name="position">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAdd;
