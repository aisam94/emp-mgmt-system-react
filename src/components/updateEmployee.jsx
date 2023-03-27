import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";

const parseRoles = (roles) => {
  let arr = [];
  for (let i = 0; i < 3; i++) {
    if (roles[i]) {
      arr.push(roles[i].name);
    }
  }
  return arr;
};

const UpdateEmployee = ({ employee }) => {
  const dispatch = useDispatch();
//   const [currentEmployee, setCurrentEmployee] = useState(employee);
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    employeeId: employee.employeeId,
    role: parseRoles(employee.role),
    department: employee.department.name,
    age: employee.age,
    pictureUrl: employee.pictureUrl,
  });

  const { name, email, employeeId, role, department, age, pictureUrl } =
    formData;

  // get all department as a list
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  // get all roles as a list
  const rolesList = useSelector((state) => state.rolesList);
  const { roles } = rolesList;

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      editEmployee({
        name,
        email,
        employeeId,
        role,
        department,
        age,
        pictureUrl,
        id: employee._id,
      })
    );
  };

//   const changeRole = (event) => {
//     switch (event.target.name) {
//       case "role1":
//         role[0] = event.target.value;
//         setFormData({ ...formData, [role]: role });
//         break;
//       case "role2":
//         role[1] = event.target.value;
//         setFormData({ ...formData, [role]: role });
//         break;
//       case "role3":
//         role[2] = event.target.value;
//         setFormData({ ...formData, [role]: role });
//         break;
//       default:
//         console.log("Error inserting roles.");
//     }
//   };

  useEffect(() => {
    dispatch(listRoles());
    dispatch(listDepartments());
  }, [dispatch]);

  return (
    <form className="flex flex-col" onSubmit={(event) => submit(event)}>
      {/*Input Form*/}
      <div className="flex flex-col space-y-2 mb-5">
        {/*Name*/}
        <div className="flex flex-col">
          <span className="text-gray">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
            onChange={(e) => change(e)}
            required
          />
        </div>

        {/*Email*/}
        <div className="flex flex-col">
          <span className="text-gray">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
            onChange={(e) => change(e)}
            required
          />
        </div>

        {/*Employee Id*/}
        <div className="flex flex-col">
          <span className="text-gray">Employee ID</span>
          <input
            type="number"
            name="employeeId"
            value={employeeId}
            className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
            onChange={(e) => change(e)}
            required
          />
        </div>

        {/*Role*/}

        {/* <div className="flex flex-col">
          <span className="text-gray">Roles (Max 3 roles)</span>
          <select
            className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
            onChange={(e) => changeRole(e)}
            name="role1"
          >
            <option value={role[0]}>-- {role[0]} --</option>
            <option value="">None</option>
            {roles.map((role, index) => (
              <option key={index} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
            onChange={(e) => changeRole(e)}
            name="role2"
          >
            <option value={role[1]}>-- {role[1]} --</option>
            <option value="">None</option>
            {roles.map((role, index) => (
              <option key={index} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
            onChange={(e) => changeRole(e)}
            name="role3"
          >
            <option value={role[2]}>-- {role[2]} --</option>
            <option value="">None</option>
            {roles.map((role, index) => (
              <option key={index} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div> */}

        {/*Department*/}

        <div className="flex flex-col">
          <span className="text-gray">Department</span>
          <select
            className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
            onChange={(e) => change(e)}
            name="department"
          >
            <option value={department}>-- {department} --</option>
            {departments.map((department, index) => (
              <option key={index} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/*Age*/}
        <div className="flex flex-col">
          <span className="text-gray">Age</span>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={age}
            className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
            onChange={(event) => change(event)}
            required
          />
        </div>

        {/* Picture */}
        <div className="flex flex-col space-y-1 ">
          <label htmlFor="file" className="text-gray">
            Profile picture
          </label>
          <input
            type="file"
            id="file"
            placeholder="Picture"
            name="picture"
            accept="image/png, image/jpeg"
            className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
          />
          <span className="text-gray">Or</span>
          <input
            type="text"
            placeholder="Picture URL"
            name="pictureUrl"
            value={pictureUrl}
            className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
            onChange={(e) => change(e)}
          />
        </div>
      </div>

      {/* Update button */}
      <input
        type="submit"
        value="UPDATE"
        className="py-2 text-white bg-secondary  hover:bg-secondary-focus"
      />
    </form>
  );
};

export default UpdateEmployee;
