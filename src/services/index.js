import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://dev3.dansmultipro.co.id/api/recruitment",
  headers: { "Content-Type": "application/json" },
});

export const getJobs = async (params, page) => {
  return await customAxios({
    method: "GET",
    url: "positions.json",
    params,
  })
    .then((value) => value)
    .catch((err) => err);
};
export const getJobDetail = async (id) => {
  return await customAxios({
    method: "GET",
    url: `/positions/${id}`,
  })
    .then((value) => value)
    .catch((err) => err);
};
