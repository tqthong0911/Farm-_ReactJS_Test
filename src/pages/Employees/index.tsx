import React, { Fragment, useCallback, useEffect, useMemo } from "react";
import { batch } from "react-redux";
import { Button, Popconfirm, Table } from "antd";
import {
  TagOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ModalAdd from "./ModalAdd/";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import Header from "./Header";
import { actions } from "./reducer";
import { selectEmployees, selectLoading, selectError } from "./selector";
import { DataView } from "./types";
import "./styles.css";
import FailedApiReload from "../../common/FailedApiReload";

interface Props {}
const Employees: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectEmployees);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const columns = useMemo(() => {
    const handleEdit = (data: DataView) => () => {
      batch(() => {
        dispatch(actions.setOpenModalAdd(true));
        dispatch(actions.setModalValues(data));
      });
    };

    const handleDelete = (data: DataView) => {
      dispatch(actions.deleteEmployeeByIdAsync({ data }));
    };

    return [
      {
        title: (
          <div>
            <UserOutlined style={{ marginRight: 4 }} /> Name
          </div>
        ),
        dataIndex: "name",
        sorter: true,
      },
      {
        title: (
          <div>
            <MailOutlined style={{ marginRight: 4 }} /> Email
          </div>
        ),
        dataIndex: "email",
        sorter: true,
      },
      {
        title: (
          <div>
            <TagOutlined style={{ marginRight: 4 }} /> Position
          </div>
        ),
        dataIndex: "position",
        sorter: true,
      },
      {
        title: "Action",
        key: "action",
        width: 100,
        render: (text: string, record: DataView) => (
          <Fragment>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={handleEdit(record)}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button type="text" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Fragment>
        ),
      },
    ];
  }, [dispatch]);

  const pagination = useMemo(
    () => ({ defaultPageSize: DEFAULT_PAGE_SIZE, hideOnSinglePage: true }),
    []
  );

  const fetchData = useCallback(() => {
    dispatch(actions.getEmployeesAsync());
  }, [dispatch]);

  // init data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Header />
      <Table
        bordered
        rowKey="id"
        pagination={pagination}
        showSorterTooltip={false}
        loading={loading}
        dataSource={data}
        columns={columns}
        locale={{
          emptyText: !loading && error && (
            <FailedApiReload onReload={fetchData} />
          ),
        }}
      />
      <ModalAdd />
    </Fragment>
  );
};
export default Employees;
