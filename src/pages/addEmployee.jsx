import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";
import {
  FileInput,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    email: "",
    employeeId: "",
    role: ["", "", ""],
    department: "",
    age: "",
    pictureUrl: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, email, employeeId, role, department, age, pictureUrl } =
    formData;

  // get all departments as a list
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

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      addEmployee({
        name,
        email,
        employeeId,
        role,
        department,
        age,
        pictureUrl,
      })
    );
    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(listRoles());
    dispatch(listDepartments());
  }, [dispatch]);

  return (
    <form className="flex flex-col" onSubmit={(event) => submit(event)}>
      {/*Input Form*/}
      <div className="flex flex-col space-y-2 mb-5">
        {/*Name*/}
        <TextInput
          label="Name"
          placeholder="Input name"
          name="name"
          value={name}
          onChange={change}
          withAsterisk
          required
        />

        {/*Email*/}
        <TextInput
          label="Email"
          placeholder="Input email"
          type="email"
          name="email"
          value={email}
          onChange={change}
          withAsterisk
          required
        />

        {/*Employee Id*/}
        <NumberInput
          label="Employee ID"
          placeholder="Input employee's ID"
          type="text"
          name="employeeId"
          value={employeeId}
          onChange={(e) => changeValue("employeeId", e)}
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
          placeholder="Input age"
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

      {/* Submit button */}
      <input
        type="submit"
        value="SUBMIT"
        className="py-2 text-white bg-secondary hover:bg-secondary-focus"
      />
    </form>
  );
};

export default AddEmployee;
