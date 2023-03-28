import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";
import { FileInput, NumberInput, Select, TextInput } from "@mantine/core";

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

  // temp solution
  const changeDept = (dept) => {
    setFormData({ ...formData, department: dept });
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
      <div className="flex flex-col space-y-4 mb-5">
        {/*Name*/}
        <TextInput
          label="Name"
          name="name"
          value={name}
          onChange={change}
          withAsterisk
          required
        />
        {/*Email*/}
        <TextInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => change(e)}
          withAsterisk
          required
        />
        {/*Employee Id*/}
        <NumberInput
          label="Employee ID"
          name="employeeId"
          value={employeeId}
          onChange={change}
          hideControls
          withAsterisk
          required
        />
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

        <Select
          label="Department"
          name="department"
          placeholder="Pick a department"
          value={department}
          onChange={changeDept}
          data={departments.map((dept) => {
            return { value: dept.name, label: dept.name };
          })}
        />

        {/*Age*/}
        <NumberInput
          label="Age"
          placeholder="Age"
          name="age"
          value={age}
          onChange={change}
          withAsterisk
          required
        />

        {/* Picture */}
        <FileInput
          label="Profile picture"
          id="file"
          placeholder="Upload picture"
          name="picture"
          accept="image/png, image/jpeg"
        />
        <span className="text-xs">Or</span>
        <TextInput
          placeholder="Insert picture URL"
          name="pictureUrl"
          value={pictureUrl}
          onChange={change}
        />
      </div>

      {/* Update button */}
      <input
        type="submit"
        value="UPDATE"
        className="py-2 text-white bg-secondary  hover:bg-secondary-focus cursor-pointer"
      />
    </form>
  );
};

export default UpdateEmployee;
