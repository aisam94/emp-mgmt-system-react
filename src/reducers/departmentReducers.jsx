export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case "DEPARTMENT_ADD_SUCCESS":
      return {
        loading: false,
        departments: [...state.departments, action.payload],
      };
    case "DEPARTMENT_EDIT_SUCCESS":
      return {
        loading: false,
        departments: state.departments.map((dept) => {
          if (dept._id === action.payload._id) {
            return action.payload;
          }
          return dept;
        }),
      };
    case "DEPARTMENT_DELETE_SUCCESS":
      return {
        loading: false,
        departments: state.departments.filter(
          (dept) => dept._id !== action.payload.id
        ),
      };
    case "DEPARTMENT_LIST_REQUEST":
      return { loading: true, departments: [] };
    case "DEPARTMENT_LIST_SUCCESS":
      return { loading: false, departments: action.payload };
    case "DEPARTMENT_ADD_FAIL":
    case "DEPARTMENT_DELETE_FAIL":
    case "DEPARTMENT_EDIT_FAIL":
    case "DEPARTMENT_LIST_FAIL":
      return { loading: false, departments: [], error: action.payload };
    default:
      return state;
  }
};
