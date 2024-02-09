import axios from "../axios";

const danhmuchoanoibat = () => {
  return axios.get("/api/danhmuchoanoibat");
};
const danhmuchoachitiettheodanhmuc = (iddanhmuchoa) => {
  return axios.get(
    `api/danhmuchoachitiettheodanhmuc?iddanhmuchoa=${iddanhmuchoa}`
  );
};

const apitatcahoa = () => {
  return axios.get("/api/tatcahoa");
};

const apihoagiamgia = () => {
  return axios.get("/api/hoagiamgia");
};

const apithongtinhoa = (id) => {
  return axios.get(`api/thongtinhoa?id=${id}`);
};

const apidangnhap = (data) => {
  return axios.post("/api/dangnhap", data);
};

const apidangky = (data) => {
  return axios.post("/api/dangky", data);
};

const apixacnhantaikhoan = (data) => {
  return axios.post("/api/xacnhandangky", data);
};

const apiquenmk = (data) => {
  return axios.post("/api/quenmk", data);
};

const apidoimk = (data) => {
  return axios.post("/api/doimk", data);
};

const apigiohang = (idnguoidung) => {
  return axios.get(`api/giohang?id=${idnguoidung}`);
};

const apisuagiohang = (data) => {
  return axios.post("api/suagiohang", data);
};

const apithemgiohang = (data) => {
  return axios.post("api/themgiohang", data);
};

const apisanphamlienquan = (iddanhmucchitiet, id) => {
  return axios.get(
    `api/sanphamlienquan?iddanhmuchoachitiet=${iddanhmucchitiet}&id=${id}`
  );
};

const apihoatheodanhmucchitiet = (iddanhmucchitiet) => {
  return axios.get(
    `api/hoatheodanhmucchitiet?iddanhmuchoachitiet=${iddanhmucchitiet}`
  );
};

const apihoatheodanhmuc = (iddanhmuchoa) => {
  return axios.get(`api/hoatheodanhmuc?iddanhmuchoa=${iddanhmuchoa}`);
};

const apitatcaphuongthucvanchuyen = () => {
  return axios.get("/api/laytatcaphuongthucvanchuyen");
};

const apidathang = (data) => {
  return axios.post("api/dathang", data);
};

const apidathangtrangchu = (data) => {
  return axios.post("api/dathangtrangchu", data);
};

const apidonhangnguoidung = (id) => {
  return axios.get(`api/donhangnguoidung?idnguoidung=${id}`);
};

const apixacnhandanhanduochang = (data) => {
  return axios.put("/api/xacnhandanhanduochang", data);
};

const apihuydonhangnguoidung = (data) => {
  return axios.put("/api/huydonhangnguoidung", data);
};

const apihoanhanghoantien = (data) => {
  return axios.put("/api/yeucauhoanhanghoantien", data);
};

const apitimhoanguoidung = (data) => {
  return axios.put(`api/timhoanguoidung`,data);
};

const apithemdanhgia = (data) => {
  return axios.post("api/themdanhgia", data);
};

const apibinhluantheohoa = (idhoa) => {
  return axios.get(`api/laybinhluantheohoa?idhoa=${idhoa}`);
};

const apithemtraloidanhgia = (data) => {
  return axios.post("api/themtraloibinhluan", data);
};

const apixoadanhgiatraloikh = (id,bang) => {
  return axios.delete(`api/xoadanhgiaortraloikh?id=${id}&bang=${bang}`);
};

const apihoatheodanhmucnoibat = () => {
  return axios.get("/api/hoatheodanhmucnoibat");
};


export {
  danhmuchoanoibat,
  danhmuchoachitiettheodanhmuc,
  apitatcahoa,
  apihoagiamgia,
  apithongtinhoa,
  apidangnhap,
  apidangky,
  apixacnhantaikhoan,
  apiquenmk,
  apidoimk,
  apigiohang,
  apisuagiohang,
  apithemgiohang,
  apisanphamlienquan,
  apihoatheodanhmucchitiet,
  apihoatheodanhmuc,
  apitatcaphuongthucvanchuyen,
  apidathang,
  apidonhangnguoidung,
  apixacnhandanhanduochang,
  apihuydonhangnguoidung,
  apihoanhanghoantien,
  apitimhoanguoidung,
  apidathangtrangchu,
  apithemdanhgia,
  apibinhluantheohoa,
  apithemtraloidanhgia,
  apixoadanhgiatraloikh,
  apihoatheodanhmucnoibat
};
