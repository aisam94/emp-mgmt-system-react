import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, listEmployees } from "../actions/employeeActions";
import Loading from "./loading";
import { Table } from "@mantine/core";
import { Drawer } from "@mantine/core";
import UpdateEmployee from "./updateEmployee";
import AddEmployee from "../pages/addEmployee";

const Record = () => {
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employeesList);
  const { loading, employees } = employeesList;

  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState();

  const parseRole = (roles) => {
    const allowedRoleToShow = 3;
    let arr = [];
    for (let i = 0; i < allowedRoleToShow; i++) {
      if (roles[i]) {
        arr.push(roles[i].name);
      }
    }
    if (roles.length > allowedRoleToShow) arr.push(" ...");
    return arr.filter(Boolean).join();
  };

  function deleteItem(employee) {
    dispatch(deleteEmployee(employee._id));
  }

  function handleUpdateEmployee(employee) {
    setCurrentEmployee(employee);
    setIsUpdateDrawerOpen(true);
  }

  function handleAddEmployee() {
    setIsAddDrawerOpen(true);
  }

  function closeUpdateDrawer() {
    setIsUpdateDrawerOpen(false);
  }

  function closeAddDrawer() {
    setIsAddDrawerOpen(false);
  }

  useEffect(() => {
    dispatch(listEmployees());
  }, [dispatch]);

  return (
    <div className="mb-12">
      <Drawer
        opened={isUpdateDrawerOpen}
        onClose={closeUpdateDrawer}
        title={"Update employee's detail"}
        position="right"
      >
        <UpdateEmployee
          employee={currentEmployee}
          deleteItem={deleteItem}
          closeUpdateDrawer={closeUpdateDrawer}
        />
      </Drawer>

      <Drawer
        opened={isAddDrawerOpen}
        onClose={closeAddDrawer}
        title={"Add an employee"}
        position="right"
      >
        <AddEmployee />
      </Drawer>

      <main className="flex flex-col items-center">
        <h2 className="text-center text-base md:text-lg font-bold mt-4">
          Employee Records
        </h2>
        <div>
          <button
            className="bg-secondary hover:bg-secondary-focus text-sm md:text-base text-white p-1 m-2 ml-4 shadow flex items-center justify-center"
            onClick={handleAddEmployee}
          >
            <img className="h-5 w-5" src="/icons/plus.svg" />
            <span>Add Employee</span>
          </button>
        </div>

        <div className="overflow-x-auto md:overflow-visible w-full px-4">
          <Table
            className="border-collapse w-full shadow border border-slate-500"
            striped
            highlightOnHover
            withBorder
            withColumnBorders
          >
            <thead>
              <tr className="">
                <th>#</th>
                <th>Name</th>
                <th>Employee Id</th>
                <th>Role</th>
                <th>Department</th>
                <th>Age</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              {loading ? (
                <tr>
                  <td className="text-center" colSpan="7">
                    <Loading />
                  </td>
                </tr>
              ) : (
                employees.map((employee, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer"
                    onClick={(e) => handleUpdateEmployee(employee)}
                  >
                    <td>{index + 1}</td>
                    <td className="flex items-center">
                      {/* Avatar */}
                      <img
                        src={`/avatar_icons/${employee.avatar}.svg`}
                        className="h-2 w-2 mx-1 md:h-10 md:w-10 md:mx-3"
                      />
                      <span>{employee.name}</span>
                    </td>
                    <td>{employee.employeeId}</td>
                    <td>{parseRole(employee.role)}</td>
                    <td>{employee.department.name}</td>
                    <td>{employee.age}</td>
                    <td>{employee.email}</td>
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

export default Record;
