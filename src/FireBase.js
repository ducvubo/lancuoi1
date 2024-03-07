// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDRc_c-OI8awcCS9unRxEUc3-6b2bUAFAQ",
//   authDomain: "tenkai-6ddaf.firebaseapp.com",
//   projectId: "tenkai-6ddaf",
//   storageBucket: "tenkai-6ddaf.appspot.com",
//   messagingSenderId: "687847558248",
//   appId: "1:687847558248:web:c3f0beb39a1d722868bfdd",
//   measurementId: "G-SBNL6ZS4JR",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyC_gfFw8GERZnDKWwWmce6AdCQ1f35U4wA",
//   authDomain: "otphhflower.firebaseapp.com",
//   projectId: "otphhflower",
//   storageBucket: "otphhflower.appspot.com",
//   messagingSenderId: "784432944662",
//   appId: "1:784432944662:web:b8014a3b1bc59f43924737",
//   measurementId: "G-E8B7QZ9DB0",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const analytics = getAnalytics(app);
// export default auth;

// const firebaseConfig = {
//   apiKey: "AIzaSyAjsNCH04W4L5xmsv5LLotEcgr648UGIaY",
//   authDomain: "firebas2otp.firebaseapp.com",
//   projectId: "firebas2otp",
//   storageBucket: "firebas2otp.appspot.com",
//   messagingSenderId: "913687238323",
//   appId: "1:913687238323:web:0fd51fdbb08b08361cc2c6"
// };

const firebaseConfig = {
  apiKey: "AIzaSyClZv9O_CX2rVgFwe7uoQWvOJHxdbR56CM",
  authDomain: "fir-otp3-47d3f.firebaseapp.com",
  projectId: "fir-otp3-47d3f",
  storageBucket: "fir-otp3-47d3f.appspot.com",
  messagingSenderId: "788660506139",
  appId: "1:788660506139:web:77760ea5c4a07d302f32be",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
