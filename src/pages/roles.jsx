import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listRoles, deleteRole } from "../actions/rolesActions";
import { addRole } from "../actions/rolesActions";
import Loading from "../components/loading";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import UpdateRole from "./updateRole";

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rolesList = useSelector((state) => state.rolesList);
  const { loading, error, roles } = rolesList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [roleInput, setRoleInput] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [currentRole, setCurrentRole] = useState();

  const change = (event) => {
    setRoleInput(event.target.value);
  };

  async function submit(event) {
    event.preventDefault();
    if (roleInput.trim() === "") return;
    await dispatch(addRole({ name: roleInput }));
    setRoleInput("");
    setIsSubmit(true);
  }

  function handleRoleEdit(role) {
    setCurrentRole(role);
    console.log(role);
    open();
  }

  async function deleteItem(role) {
    // event.preventDefault();
    await dispatch(deleteRole(role._id));
    setIsSubmit(true);
  }

  useEffect(() => {
    dispatch(listRoles());
    setIsSubmit(false);
  }, [dispatch, isSubmit]);

  return (
    <div className="mb-12">
      <Drawer
        opened={opened}
        onClose={close}
        title="Update role"
        position="right"
      >
        <UpdateRole role={currentRole} />
      </Drawer>

      <main className="flex flex-col items-center">
        <h2 className="text-center text-base md:text-lg font-bold mt-4">
          Roles List
        </h2>

        <form
          id="roleInputForm"
          className="flex items-center"
          onSubmit={submit}
        >
          <input
            type="text"
            aria-label="Enter new role"
            placeholder="Enter new role..."
            className="text-sm md:text-base w-full p-1 m-2 bg-gray border border-gray outline-none text-center"
            value={roleInput}
            onChange={change}
          />
          <button type="submit" form="roleInputForm">
            <img
              className="h-8 w-8 bg-secondary hover:bg-secondary-focus text-white p-1"
              src="/icons/plus.svg"
              onClick={submit}
            />
          </button>
        </form>

        <Table
          className="border-collapse shadow w-2/3 md:w-1/2"
          striped
          highlightOnHover
          withBorder
          withColumnBorders
        >
          <thead>
            <tr className="" bgcolor="">
              <th>Roles</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm md:text-base">
            {loading ? (
              <tr>
                <td className="text-center" colSpan="2">
                  <Loading />
                </td>
              </tr>
            ) : (
              roles.map((role, index) => (
                <tr key={index}>
                  <td
                    className="text-center cursor-pointer"
                    onClick={(e) => handleRoleEdit(role)}
                  >
                    {role.name}
                  </td>
                  <td className="flex justify-around items-center ">
                    {/* Edit */}

                    {/* Delete */}
                    <Button
                      className="flex items-center justify-center bg-red text-white w-full hover:bg-red-focus"
                      onClick={() => {
                        deleteItem(role);
                      }}
                    >
                      <img className="h-5 w-5" src="/icons/cross.svg" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default Roles;
