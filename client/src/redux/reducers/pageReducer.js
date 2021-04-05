export const pageReducer = (
  state = { on_home_page: true, on_regis_page: false, on_login_page: false },
  action
) => {
  switch (action.type) {
    case "ON_REGIS_PAGE":
      return action.payload;
    case "ON_LOGIN_PAGE":
      return action.payload;
    case "ON_HOME_PAGE":
      return action.payload;

    default:
      return state;
  }
};
