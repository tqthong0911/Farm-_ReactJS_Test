import axios from "axios";
import queryString from "query-string";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";
import { DataPost } from "./types";

interface FetchEmployees {
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export const fetchEmployees = async () => {
  const urlQuery = queryString.stringifyUrl({
    url: `${process.env.REACT_APP_API_ENDPOINT}/employees`,
  });
  return axios.get(urlQuery);
};

export const fetchEmployeesWithParams = async (params?: FetchEmployees) => {
  const { sortBy, order, page = 1, limit = DEFAULT_PAGE_SIZE } = params || {};

  const urlQuery = queryString.stringifyUrl({
    url: `${process.env.REACT_APP_API_ENDPOINT}/employees`,
    query: {
      sortBy,
      order,
      p: page,
      l: limit,
    },
  });
  return axios.get(urlQuery);
};

export const createEmployee = (data: DataPost) => {
  return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/employees`, data);
};

export const getEmployeeById = (id: string) => {
  return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/employees/${id}`);
};

export const updateEmployeeById = (data: DataPost) => {
  return axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/employees/${data.id}`,
    data
  );
};

export const deleteEmployeeById = (id: string) => {
  return axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/employees/${id}`);
};
