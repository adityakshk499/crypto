import React, { useState } from "react";
import {Link}  from 'react-router-dom'
import { BsCoin } from "react-icons/bs";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";
import ThemeToggle from "./Toggle";
const Navbar = () => {
  const [nav, setnav] = useState(false);
  return (
    <div className="flex mx-2 p-4 flex-row  justify-between  rounded-lg items-center shadow-xl shadow-gray-300 dark:shadow-gray-800">
      <div className="flex mt-1 flex-row space-x-1">
        <div className="text-sm md:text-xl mt-1 font-bold">Crypto-Track </div>
        <BsCoin className="md:w-10 md:h-10" size={25} />
      </div>
      <div className=" hidden md:flex flex-row  space-x-8 justify-center items-center font-semibold text-lg">
        <Link to='/' className=" cursor-pointer dark:hover:text-fuchsia-500 hover:text-teal-600">
          Top-50
        </Link>
        <Link to='/trending' className=" cursor-pointer  dark:hover:text-fuchsia-500 hover:text-teal-600">
          Trending
        </Link>
        
        <ThemeToggle />
      </div>

      <div
        className="cursor-pointer md:hidden"
        onClick={() => setnav(!nav ? true : false)}
      >
        {nav ? <GiSplitCross /> : <GiHamburgerMenu />}
      </div>

      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 justify-between flex flex-col items-center  w-full h-[90%]  bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[99%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full  p-4 font-semibold text-lg">
          <li className="border-b py-6">
            <Link to='/' className=" cursor-pointer dark:hover:text-fuchsia-500 hover:text-teal-600">
              Top-50
            </Link>
          </li>

          <li className="border-b py-6">
            <Link to='/trending' className=" cursor-pointer  dark:hover:text-fuchsia-500 hover:text-teal-600">
              Trending
            </Link>
          </li>

          

          <li className="border-b py-6">
            <ThemeToggle></ThemeToggle>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
