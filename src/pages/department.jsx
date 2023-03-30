import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listDepartments,
  deleteDepartment,
} from "../actions/departmentActions";
import Loading from "../components/loading";
import { Table } from "@mantine/core";
import { Drawer } from "@mantine/core";
import UpdateDepartment from "../components/updateDepartment";
import AddDepartment from "./addDepartment";

const Department = () => {
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.departmentList);
  const { loading, error, departments } = departmentList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const [currentDepartment, setCurrentDepartment] = useState();

  const [isRefresh, setIsRefresh] = useState(false);

  function handleUpdateDepartment(department) {
    setCurrentDepartment(department);
    setIsUpdateDrawerOpen(true);
  }

  async function deleteItem(department) {
    await dispatch(deleteDepartment(department._id));
    setIsRefresh(true);
  }

  function handleAddDepartment() {
    setIsAddDrawerOpen(true);
  }

  function closeUpdateDrawer() {
    setIsUpdateDrawerOpen(false);
  }

  function closeAddDrawer() {
    setIsAddDrawerOpen(false);
  }

  useEffect(() => {
    dispatch(listDepartments());
    setIsRefresh(false);
  }, [dispatch, isRefresh]);

  return (
    <div className="mb-12">
      <Drawer
        opened={isUpdateDrawerOpen}
        onClose={closeUpdateDrawer}
        title="Update Department"
        position="right"
      >
        <UpdateDepartment
          department={currentDepartment}
          setIsRefresh={setIsRefresh}
          deleteItem={deleteItem}
        />
      </Drawer>

      <Drawer
        opened={isAddDrawerOpen}
        onClose={closeAddDrawer}
        title="Add a Department"
        position="right"
      >
        <AddDepartment setIsRefresh={setIsRefresh} />
      </Drawer>

      <main className="flex flex-col items-center">
        <h2 className="text-center text-base md:text-lg font-bold mt-4">
          Department List
        </h2>
        <div>
          <button
            className="text-sm md:text-base bg-secondary hover:bg-secondary-focus text-white p-1 m-2 ml-4 shadow flex items-center justify-center"
            onClick={handleAddDepartment}
          >
            <img className="h-5 w-5" src="/icons/plus.svg" />
            <span>Add Department</span>
          </button>
        </div>

        <div className="w-full overflow-x-auto px-4">
          <Table
            className=""
            striped
            highlightOnHover
            withBorder
            withColumnBorders
          >
            <thead>
              <tr>
                <th>Department</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody className="text-sm md:text-base">
              {loading ? (
                <tr>
                  <td className="text-center" colSpan="3">
                    <Loading />
                  </td>
                </tr>
              ) : (
                departments.map((department, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer"
                    onClick={(e) => handleUpdateDepartment(department)}
                  >
                    <td className="flex items-center">
                      <span>{department.name}</span>
                    </td>
                    <td>{department.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Department;
