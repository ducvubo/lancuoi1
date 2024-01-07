import axios from "../axios";

const layAllCode = (kieu) => {
  return axios.post(`/api/allcode?kieu=${kieu}`);
};

const themnguoidung = (data) => {
  return axios.post("/api/themnguoidung", data);
};

const laytatcanguoidung = () => {
  return axios.post("/api/allnguoidung");
};

const lay1nguoidung = (id) => {
  return axios.post(`api/all1nguoidung?id=${id}`);
};

const apixoanguoidung = (id) => {
  return axios.delete(`api/xoanguoidung?id=${id}`);
};

const apisuanguoidung = (data) => {
  return axios.put("/api/suanguoidung", data);
};

const themdanhmuc = (data) => {
  return axios.post("/api/themdanhmuc", data);
};

const tatcadanhmuc = () => {
  return axios.post("/api/alldanhmuc");
};

const apisuadanhmuc = (data) => {
  return axios.put("/api/suadanhmuc", data);
};

const apixoadanhmuc = (id) => {
  return axios.delete(`api/xoadanhmuc?id=${id}`);
};

const themdanhmucchitiet = (data) => {
  return axios.post("/api/themdanhmuchoachitiet", data);
};

const tatcadanhmucchitiet = () => {
  return axios.post("/api/alldanhmuchoachitiet");
};

const apisuadanhmucchitiet = (data) => {
  return axios.put("/api/suadanhmuchoachitiet", data);
};

const apixoadanhmucchitiet = (id) => {
  return axios.delete(`api/xoadanhmucchitet?id=${id}`);
};

const apithemhoa = (data) => {
  return axios.post("api/themhoa",data);
};

const apitatcahoa = () => {
  return axios.post("/api/tatcahoa");
};

const apisuahoa = (data) => {
  return axios.put("/api/suahoa", data);
};

const apixoahoa = (id) => {
  return axios.delete(`api/xoahoa?id=${id}`);
};

export {
  layAllCode,
  themnguoidung,
  laytatcanguoidung,
  lay1nguoidung,
  apixoanguoidung,
  apisuanguoidung,
  themdanhmuc,
  tatcadanhmuc,
  apisuadanhmuc,
  apixoadanhmuc,
  themdanhmucchitiet,
  tatcadanhmucchitiet,
  apisuadanhmucchitiet,
  apixoadanhmucchitiet,
  apithemhoa,
  apitatcahoa,
  apisuahoa,
  apixoahoa
};
