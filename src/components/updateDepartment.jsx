import { useState } from "react";
import { editDepartment } from "../actions/departmentActions";
import { useDispatch } from "react-redux";
import { Button, FileInput, TextInput, Textarea } from "@mantine/core";

const UpdateDepartment = ({ department, setIsRefresh, deleteItem }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: department.name,
    description: department.description,
    pictureUrl: department.pictureUrl,
  });
  const { name, description, pictureUrl } = formData;

  function change(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    dispatch(
      editDepartment({
        name,
        description,
        pictureUrl,
        id: department._id,
      })
    );
    setIsRefresh(true);
  }

  function handleDelete() {
    deleteItem(department);
  }

  return (
    <form className="flex flex-col" onSubmit={submit}>
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
        className="my-2 py-2 text-white bg-secondary  hover:bg-secondary-focus cursor-pointer"
      />

      {/* Delete button */}
      <div className="flex w-full px-1 mb-2 mt-8 justify-between items-center">
        <span className="text-red">Delete this department?</span>
        <Button className="bg-red" color="red" uppercase onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default UpdateDepartment;
