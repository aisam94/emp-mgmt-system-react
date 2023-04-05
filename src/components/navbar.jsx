import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : "";
  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-primary shadow">
      <div className="page-width-container flex flex-col w-full md:flex-row md:justify-between items-center  shadow-lg text-white py-3 px-2">
        {/* Logo and company */}
        <div className="flex items-center">
          <img
            className="h-9 w-9 mx-4 hidden md:inline cursor-pointer hover:scale-110"
            src="/icons/community.svg"
            onClick={() => navigate("/")}
          />

          {userInfo && !isExpired(token) ? (
            <h1 className="text-lg">{userInfo.company}</h1>
          ) : (
            <h1 className="text-xl font-bold uppercase">EMS</h1>
          )}
        </div>

        <div className="flex ">
          {/* <NavLink className="mx-2" to="/about">
          <h1>About</h1>
        </NavLink> */}
          {!userInfo || !userInfo.length === 0 || isExpired(token) ? (
            <div className="flex items-center">
              <NavLink className="mx-2" to="/login">
                <h1>Sign In</h1>
              </NavLink>
              <NavLink className="mx-2 font-bold" to="/register">
                <h1 className="shadow border-none text-black rounded px-4 py-2 bg-tertiary hover:bg-tertiary-focus uppercase">
                  Try for free
                </h1>
              </NavLink>
            </div>
          ) : (
            <div className="flex">
              <NavLink
                className="flex items-center mx-2 space-x-1 hover:scale-110 transition-all"
                to="/department"
              >
                <img className="flex h-6 w-6" src="/icons/dept.svg" />
                <h1>Departments</h1>
              </NavLink>
              <NavLink
                className="flex items-center mx-2 space-x-1 hover:scale-110 transition-all"
                to="/roles"
              >
                <img className="flex h-5 w-5" src="/icons/role.svg" />
                <h1>Roles</h1>
              </NavLink>
              <NavLink
                className="flex items-center mx-2 space-x-1 hover:scale-110 transition-all"
                to="/record"
              >
                <img className="flex h-6 w-6" src="/icons/employees.svg" />
                <h1>Employees</h1>
              </NavLink>
              <button className="text-accent font-bold mx-2" onClick={logOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
