export const rolesListReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case "ROLE_ADD_SUCCESS":
      return { loading: false, roles: [...state.roles, action.payload] };
    case "ROLE_EDIT_SUCCESS":
      return {
        loading: false,
        roles: state.roles.map((role) => {
          if (role._id === action.payload._id) {
            return action.payload;
          }
          return role;
        }),
      };
    case "ROLE_DELETE_SUCCESS":
      return {
        loading: false,
        roles: state.roles.filter((role) => role._id !== action.payload.id),
      };
    case "ROLE_LIST_SUCCESS":
      return { loading: false, roles: action.payload };
    case "ROLE_ADD_FAIL":
    case "ROLE_EDIT_FAIL":
    case "ROLE_DELETE_FAIL":
    case "ROLE_LIST_FAIL":
      return { loading: false, roles: [], error: action.payload };
    default:
      return state;
  }
};

export const rolesAddReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case "ROLE_ADD_REQUEST":
      return { loading: true, roles: [] };
    case "ROLE_ADD_SUCCESS":
      return { loading: false, roles: action.payload };
    case "ROLE_ADD_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
