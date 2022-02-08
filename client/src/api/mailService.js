import axios from "axios";

export const sendMailOtpcode = async (...email) => {
  return await axios.put(`http://localhost:5000/sendMail/${email}/otpCode`);
};
export const sendMailContext = async (...email) => {
  return await axios.put(`http://localhost:5000/sendMail/${email}/context`);
};
export const conFirmOtpCode = async (otp) => {
  return await axios.post(`http://localhost:5000/sendMail/${otp}/confrimOtp`);
};
export const conFirmEmail = async (email) => {
  return await axios.post(`http://localhost:5000/sendMail/${email}/conFirmEmail`);
};
export const sendMailOrderStatus = async (obj) => {
  return await axios.put(`http://localhost:5000/sendMail/OrderStatus`,obj);
};
