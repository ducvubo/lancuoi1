import axios from "../axios";

const danhmuchoanoibat = () => {
  return axios.post("/api/danhmuchoanoibat");
};
const danhmuchoachitiettheodanhmuc = (iddanhmuchoa) => {
    return axios.post(`api/danhmuchoachitiettheodanhmuc?iddanhmuchoa=${iddanhmuchoa}`);
}

export { 
    danhmuchoanoibat,
    danhmuchoachitiettheodanhmuc
 };
