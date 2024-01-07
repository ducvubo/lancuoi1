import axios from "../axios";

const danhmuchoanoibat = () => {
  return axios.post("/api/danhmuchoanoibat");
};
const danhmuchoachitiettheodanhmuc = (iddanhmuchoa) => {
    return axios.post(`api/danhmuchoachitiettheodanhmuc?iddanhmuchoa=${iddanhmuchoa}`);
}

const apitatcahoa = () => {
  return axios.post("/api/tatcahoa");
};

const apihoagiamgia = () => {
  return axios.post("/api/hoagiamgia");
};
const apihoatetbanchay = () => {
  return axios.post("/api/hoatetbanchay");
};
const hoatetgiamgia = () => {
  return axios.post("/api/hoatetgiamgia");
};
const apihoasinhnhat = () => {
  return axios.post("/api/hoasinhnhat");
};
const apihoakhaitruong = () => {
  return axios.post("/api/hoakhaitruong");
};
const apilanhodiep = () => {
  return axios.post("/api/lanhodiep");
};

export { 
    danhmuchoanoibat,
    danhmuchoachitiettheodanhmuc,
    apitatcahoa,
    apihoagiamgia,
    apihoakhaitruong,
    apihoasinhnhat,
    apihoatetbanchay,
    apilanhodiep,
    hoatetgiamgia
 };
