import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";
import {
  Button,
  FileInput,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";

const parseRoles = (roles) => {
  let arr = [];
  for (let i = 0; i < roles.length; i++) {
    if (roles[i]) {
      arr.push(roles[i].name);
    }
  }
  return arr;
};

const UpdateEmployee = ({ employee, setIsRefresh, deleteItem }) => {
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
  const changeValue = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  async function submit(event) {
    event.preventDefault();
    await dispatch(
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
    setIsRefresh(true);
  }

  function handleDelete() {
    deleteItem(employee);
  }

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
          onChange={(e) => changeValue("employeeId", e)}
          hideControls
          withAsterisk
          required
        />

        {/*Role*/}

        <MultiSelect
          label="Job Title"
          placeholder="Pick job titles"
          value={role}
          data={roles.map((role) => {
            return { value: role.name, label: role.name };
          })}
          onChange={(e) => changeValue("role", e)}
        />

        {/*Department*/}

        <Select
          label="Department"
          name="department"
          placeholder="Pick a department"
          value={department}
          onChange={(e) => changeValue("department", e)}
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
          onChange={(e) => changeValue("age", e)}
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
        className="py-2 rounded text-white font-bold bg-secondary  hover:bg-secondary-focus cursor-pointer"
      />

      {/* Delete button */}
      <div className="flex w-full px-1 mb-2 mt-8 justify-between items-center">
        <span className="text-red">Delete this employee?</span>
        <Button className="bg-red" color="red" uppercase onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default UpdateEmployee;
