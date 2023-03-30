import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDepartment } from "../actions/departmentActions";
import { TextInput, Textarea } from "@mantine/core";

const AddDepartment = ({ setIsRefresh }) => {
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, description } = formData;

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function submit(event) {
    event.preventDefault();
    await dispatch(addDepartment({ name, description }));
    setFormData(initialState);
    setIsRefresh(true);
  }

  return (
    <form className="flex flex-col" onSubmit={(event) => submit(event)}>
      {/*Input Form*/}
      <div className="flex flex-col space-y-2">
        {/*Name*/}
        <TextInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={change}
          withAsterisk
          required
        />

        {/*Description*/}
        <Textarea
          label="Description"
          placeholder="Description"
          name="description"
          value={description}
          minRows={5}
          onChange={change}
        />
      </div>

      {/* Submit button */}
      <input
        type="submit"
        value="SUBMIT"
        className="my-2 py-2 text-white bg-secondary  hover:bg-secondary-focus cursor-pointer"
      />
    </form>
  );
};

export default AddDepartment;
