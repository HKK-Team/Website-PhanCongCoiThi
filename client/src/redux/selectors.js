// lấy thông tin thư ký đăng nhập
export const getSecretaryAccLogin = (state) =>
  state.SecretaryAccount.secretaryAccountApi.data[0];
// lấy thông tin giang vien đăng nhập
export const getLecturersAccLogin = (state) =>
  state.LecturersAccount.lecturersAccountApi.data[0];
