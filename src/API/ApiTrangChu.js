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
const apihoatet = () => {
  return axios.get("/api/hoatet");
};
const apihoasinhnhat = () => {
  return axios.get("/api/hoasinhnhat");
};
const apihoakhaitruong = () => {
  return axios.get("/api/hoakhaitruong");
};
const apilanhodiep = () => {
  return axios.get("/api/lanhodiep");
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
    return axios.post("api/suagiohang",data);
}

const apithemgiohang = (data) => {
  return axios.post("api/themgiohang",data);
}

const apisanphamlienquan = (iddanhmucchitiet,id) => {
  return axios.get(`api/sanphamlienquan?iddanhmuchoachitiet=${iddanhmucchitiet}&id=${id}`);
}

const apihoatheodanhmucchitiet = (iddanhmucchitiet) => {
  return axios.get(`api/hoatheodanhmucchitiet?iddanhmuchoachitiet=${iddanhmucchitiet}`);
}

const apihoatheodanhmuc = (iddanhmuchoa) => {
  return axios.get(`api/hoatheodanhmuc?iddanhmuchoa=${iddanhmuchoa}`);
}

export {
  danhmuchoanoibat,
  danhmuchoachitiettheodanhmuc,
  apitatcahoa,
  apihoagiamgia,
  apihoakhaitruong,
  apihoasinhnhat,
  apihoatet,
  apilanhodiep,
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
  apihoatheodanhmuc
};
