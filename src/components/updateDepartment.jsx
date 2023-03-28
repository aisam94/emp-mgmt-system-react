import { useState } from "react";
import { editDepartment } from "../actions/departmentActions";
import { useDispatch } from "react-redux";

const UpdateDepartment = ({ department, setIsRefresh }) => {
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

  return (
    <form className="flex flex-col" onSubmit={submit}>
      {/*Input Form*/}
      <div className="flex flex-col space-y-8 mb-5">
        {/*Name*/}
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
          onChange={change}
          required
        />

        {/*Description*/}
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          rows="10"
          cols="40"
          className="w-full px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
          onChange={(e) => change(e)}
        />
      </div>

      {/* Picture */}

      <div className="flex flex-col space-y-1 ">
        <label htmlFor="file">Profile picture</label>
        <input
          type="file"
          id="file"
          placeholder="Picture"
          name="picture"
          accept="image/png, image/jpeg"
          className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
        />
        <span>Or</span>
        <input
          type="text"
          placeholder="Picture URL"
          name="pictureUrl"
          value={pictureUrl}
          className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
          onChange={(e) => change(e)}
        />
      </div>

      {/* Update button */}
      <input
        type="submit"
        value="UPDATE"
        className="my-2 py-2 text-white bg-secondary  hover:bg-secondary-focus"
      />
    </form>
  );
};

export default UpdateDepartment;
