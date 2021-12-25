// lấy thông tin thư ký đăng nhập
export const getSecretaryAccLogin = (state) =>
  state.SecretaryAccount.secretaryAccountApi.data[0];
