import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";

const FrontPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/record");
  //   }
  // }, [navigate, userInfo]);

  return (
    <div>
      <main className="flex flex-col items-center">
        <div className="bg-accent-focus w-full">
          <div className="page-width-container flex flex-col items-center w-full">
            <h1 className="font-bold text-5xl mt-10 text-center">
              Manage your employees effortlessly
            </h1>
            <p className="text-xl text-center mx-auto my-10 w-3/4 md:w-1/2 md:leading-loose">
              Fulfill your organization's management needs with this website.
              Gain better understanding of your entire workforce with a proper
              system. Start by creating an account or login if you already have
              one.
            </p>
            <NavLink
              to="/register"
              className="m-2 py-5 px-12 font-bold text-white bg-secondary hover:bg-secondary-focus rounded-lg uppercase"
            >
              SIGN UP FOR FREE
            </NavLink>
            <span className="mb-4">It is free to try. No payment needed.</span>
          </div>
        </div>
        {/* Further description */}
        <div className="bg-gray w-full">
          <div className="page-width-container w-full flex flex-col items-center">
            {/* One */}
            <div className="py-8 flex flex-col md:flex-row w-full items-center md:items-start justify-center">
              <div className="frontpage-context flex flex-col mx-4 mb-4">
                <span className="text-xl md:text-3xl font-bold">
                  Create employees record with ease
                </span>
                <span className="md:text-lg">
                  The system allows you to easily input and track your
                  employees' data. From employee's name to job titles, every
                  data properties can be tracked.
                </span>
              </div>
              <div>
                <img
                  className="frontpage-context border-4 mx-4"
                  src="/screenshots/record.png"
                />
              </div>
            </div>
            {/* Two */}
            <div className=" py-8 flex flex-col-reverse md:flex-row w-full items-center md:items-start justify-center">
              <div>
                <img
                  className="frontpage-context border-4 mx-4"
                  src="/screenshots/update_employee.png"
                />
              </div>
              <div className="frontpage-context flex flex-col mx-4 mb-4">
                <span className="text-xl md:text-3xl font-bold">
                  Manage your employees
                </span>
                <span className="md:text-lg">
                  You can update your employees information as needed. You can
                  assign them to their own respective department and roles in
                  the company.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FrontPage;
