import { useState } from "react";
import { editDepartment } from "../actions/departmentActions";
import { useDispatch } from "react-redux";
import { Button, Modal, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const UpdateDepartment = ({ department, deleteItem, closeUpdateDrawer }) => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  const [formData, setFormData] = useState({
    name: department.name,
    description: department.description,
  });
  const { name, description } = formData;

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
        id: department._id,
      })
    );
  }

  function openDeleteConfirmation() {
    open();
  }

  function deleteDepartment() {
    deleteItem(department);
    close();
    closeUpdateDrawer();
  }

  return (
    <form className="flex flex-col" onSubmit={submit}>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete confirmation"
        centered
        shadow
      >
        <div className="text-red mb-8">
          Are you sure you want to delete this department?
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
            onClick={deleteDepartment}
          >
            Yes
          </button>
        </div>
      </Modal>
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

      {/* Update button */}
      <input
        type="submit"
        value="UPDATE"
        className="my-2 py-2 text-white bg-secondary  hover:bg-secondary-focus cursor-pointer"
      />

      {/* Delete button */}
      <div className="flex w-full px-1 mb-2 mt-8 justify-between items-center">
        <span className="text-red">Delete this department?</span>
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

export default UpdateDepartment;
