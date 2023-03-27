import { useState } from "react";
import { useDispatch } from "react-redux";
import { editRole } from "../actions/rolesActions";

const UpdateRole = ({ role }) => {
  const [currentRole, setCurrentRole] = useState(role);

  const dispatch = useDispatch();

  function change(e) {
    e.preventDefault();
    const newRole = {...currentRole, name: e.target.value};
    setCurrentRole(newRole);
  }

  function submit(event) {
    event.preventDefault();
    dispatch(
      editRole({
        name: currentRole.name,
        id: currentRole._id,
      })
    );
  }

  return (
    <form className='flex flex-col items-center space-y-4 mt-4' onSubmit={submit}>
      <div className="w-full">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={currentRole?.name}
          className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow w-full"
          onChange={change}
          required
        />
      </div>

      <input
        type="submit"
        value="UPDATE"
        className="py-2 text-white bg-secondary  hover:bg-secondary-focus w-full"
      />
    </form>
  );
};

export default UpdateRole;
