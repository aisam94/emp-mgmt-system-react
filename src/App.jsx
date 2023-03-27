import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import FrontPage from "./pages/frontpage";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";
import Record from "./components/record";
import AddEmployee from "./pages/addEmployee";
import Department from "./pages/department";
import AddDepartment from "./pages/addDepartment";
import EditDepartment from "./pages/editDepartment";
import Roles from "./pages/roles";
import AuthWrapper from "./components/authWrapper";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* page that dont need authorization */}

        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/about" element={<About />} />

        {/* page that need authorization */}

        <Route element={<AuthWrapper />}>
          <Route exact path="/roles" element={<Roles />} />
          <Route exact path="/department" element={<Department />} />
          <Route exact path="/adddepartment" element={<AddDepartment />} />
          <Route
            exact
            path="/editdepartment/:id"
            element={<EditDepartment />}
          />

          <Route exact path="/record" element={<Record />} />
          <Route exact path="/addemployee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
