import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRoles, deleteRole } from "../actions/rolesActions";
import { addRole } from "../actions/rolesActions";
import Loading from "../components/loading";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import UpdateRole from "./updateRole";

const Roles = () => {
  const dispatch = useDispatch();
  const rolesList = useSelector((state) => state.rolesList);
  const { loading, roles } = rolesList;

  const [roleInput, setRoleInput] = useState("");

  const [opened, { open, close }] = useDisclosure(false);
  const [currentRole, setCurrentRole] = useState();

  const change = (event) => {
    setRoleInput(event.target.value);
  };

  function submit(event) {
    event.preventDefault();
    if (roleInput.trim() === "") return;
    dispatch(addRole({ name: roleInput }));
    setRoleInput("");
  }

  function handleRoleEdit(role) {
    setCurrentRole(role);
    open();
  }

  function deleteItem(role) {
    dispatch(deleteRole(role._id));
  }

  useEffect(() => {
    dispatch(listRoles());
  }, [dispatch]);

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
              <th>#</th>
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
                  <td>{index + 1}</td>
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
