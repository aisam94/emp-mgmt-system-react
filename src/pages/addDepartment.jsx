import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDepartment } from "../actions/departmentActions";

const AddDepartment = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    description: "",
    pictureUrl: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, description, pictureUrl } = formData;

  const dispatch = useDispatch();

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(addDepartment({ name, description, pictureUrl }));
    setFormData(initialState);
  };

  return (
    <div className="mb-12">
      <button
        className="bg-secondary hover:bg-secondary-focus text-white p-2 m-2 flex items-center space-x-2"
        onClick={() => {
          navigate("/department");
        }}
      >
        <img className="w-4 h-4" src="/icons/arrow-left.svg"/>
        <span>Go back</span>
      </button>
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4 mt-8">
        <h1 className="text-3xl font-bold">Add Department</h1>

        {/* Form */}
        <form className="flex flex-col" onSubmit={(event) => submit(event)}>
          {/*Input Form*/}
          <div className="flex flex-col space-y-8 mb-5">
            {/*Name*/}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
              onChange={(event) => change(event)}
              required
            />

            {/*Description*/}
            <textarea
              placeholder="Description"
              name="description"
              value={description}
              rows="10"
              cols="40"
              className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
              onChange={(event) => change(event)}
            />

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
                onChange={(event) => change(event)}
              />
            </div>
          </div>

          {/* Submit button */}
          <input
            type="submit"
            value="SUBMIT"
            className="py-2 text-white bg-primary  hover:bg-primary-light"
          />
        </form>
      </main>
    </div>
  );
};

export default AddDepartment;