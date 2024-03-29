import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";
import {
  Avatar,
  Button,
  FileInput,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { avatars } from "../avatar";

const parseRoles = (roles) => {
  let arr = [];
  for (let i = 0; i < roles.length; i++) {
    if (roles[i]) {
      arr.push(roles[i].name);
    }
  }
  return arr;
};

const SelectAvatar = ({ image, ...others }) => (
  // <div ref={ref} {...others}>
  <div {...others}>
    <Avatar src={image} />
  </div>
);

const UpdateEmployee = ({ employee, deleteItem, closeUpdateDrawer }) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    employeeId: employee.employeeId,
    role: parseRoles(employee.role),
    department: employee.department.name,
    age: employee.age,
    pictureUrl: employee.pictureUrl,
    avatar: employee.avatar,
  });

  const { name, email, employeeId, role, department, age, pictureUrl, avatar } =
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

  function submit(event) {
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
        avatar,
        id: employee._id,
      })
    );
  }

  function openDeleteConfirmation() {
    open();
  }

  function deleteEmployee() {
    deleteItem(employee);
    close();
    closeUpdateDrawer();
  }

  useEffect(() => {
    dispatch(listRoles());
    dispatch(listDepartments());
  }, [dispatch]);

  return (
    <form className="flex flex-col" onSubmit={(event) => submit(event)}>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete confirmation"
        centered
        shadow
      >
        <div className="text-red mb-8">
          Are you sure you want to delete this employee?
        </div>
        <div className="flex justify-around">
          <button
            className="bg-white hover:bg-gray text-black px-4 py-1 w-20 rounded border cursor-pointer"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="bg-red hover:bg-red-focus text-white px-4 py-1 w-20 rounded cursor-pointer"
            onClick={deleteEmployee}
          >
            Yes
          </button>
        </div>
      </Modal>
      {/*Input Form*/}
      <div className="flex flex-col space-y-4 mb-5">
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
          onChange={(e) => change(e)}
          withAsterisk
          required
        />
        {/*Employee Id*/}
        <NumberInput
          label="Employee ID"
          placeholder="Input employee's ID"
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

        {/* Avatar */}
        <Select
          label="Choose your avatar"
          placeholder="Pick one only"
          data={avatars}
          value={avatar}
          onChange={(e) => changeValue("avatar", e)}
          itemComponent={SelectAvatar}
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
        <Button
          className="bg-red"
          color="red"
          uppercase
          onClick={openDeleteConfirmation}
        >
          Delete
        </Button>
      </div>
    </form>
  );
};

export default UpdateEmployee;
