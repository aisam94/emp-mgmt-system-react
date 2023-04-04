import React from "react";

const About = () => {
  return (
    <main className="flex flex-col items-center mb-12">
      <h1 className="font-bold text-3xl mt-10 mb-5">ABOUT US</h1>
      <p className="mt-3 w-2/3 md:w-1/2 text-justify flex flex-col space-y-6 text-lg">
        <span>
          Welcome to our Employee Management System website! We provide a
          comprehensive and user-friendly platform for businesses of all sizes
          to manage their employees efficiently and effectively.
        </span>
        <span>
          This is a website designed to assist users in managing their employees
          data. Users can create their own account and start managing their
          workforce data.
        </span>
        <span>
          We understand that managing a workforce can be time-consuming and
          challenging. That's why we designed our system to be intuitive and
          easy to use, so you can focus on what really matters - growing your
          business.
        </span>
        <span>
          Join us today and take the first step towards managing your workforce
          with ease!
        </span>
      </p>
    </main>
  );
};

export default About;
