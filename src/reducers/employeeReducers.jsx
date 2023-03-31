export const employeesListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case "EMPLOYEES_ADD_SUCCESS":
      return {
        loading: false,
        employees: [...state.employees, action.payload],
      };
    case "EMPLOYEES_EDIT_SUCCESS":
      return {
        loading: false,
        employees: state.employees.map((employee) => {
          if (employee._id === action.payload._id) {
            return action.payload;
          }
          return employee;
        }),
      };
    case "EMPLOYEES_DELETE_SUCCESS":
      return {
        loading: false,
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload.id
        ),
      };
    case "EMPLOYEES_LIST_REQUEST":
      return { loading: true, employees: [] };
    case "EMPLOYEES_LIST_SUCCESS":
      return { loading: false, employees: action.payload };
    case "EMPLOYEES_ADD_FAIL":
    case "EMPLOYEES_EDIT_FAIL":
    case "EMPLOYEES_DELETE_FAIL":
    case "EMPLOYEES_LIST_FAIL":
      return { loading: false, employees: [], error: action.payload };
    default:
      return state;
  }
};
