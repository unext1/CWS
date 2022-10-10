import React from "react";
import { Link } from "@remix-run/react";

const Navbar = ({ sessionUser, cartQty }: any) => {
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "All Countries",
      href: "/parduotuve",
    },
  ];

  const [nav, setNav] = React.useState(true);

  return (
    <>
      <div className="fixed z-50 w-full py-4 shadow-xl bg-brand-dark-700">
        <div className="container flex flex-col px-3 mx-auto md:items-center md:justify-between md:flex-row md:px-5">
          <div className="flex flex-row items-center justify-between ">
            <Link
              to="/"
              onClick={() => setNav(true)}
              className="text-lg font-bold tracking-[0.05em] uppercase my-auto text-white focus:outline-none focus:shadow-outline"
            >
              Country Web Service
            </Link>

            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={() => setNav(!nav)}
            >
              <svg
                className="block w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav
            className={`flex-col gap-8 pt-2 md:pt-0 flex-grow pb-4  md:pb-0 md:flex md:justify-end md:flex-row  ${
              nav ? "hidden" : "block"
            }`}
          >
            {navLinks.map((i, index) => (
              <Link
                to={i.href}
                key={index}
                onClick={() => setNav(!nav)}
                className="block py-2 mt-2 text-sm font-semibold text-white transition duration-150 ease-in-out rounded-lg md:mt-0 hover:text-gray-400 focus:outline-none focus:shadow-outline"
              >
                {i.name}
              </Link>
            ))}
            {/* <div className="relative my-auto mt-4 group md:mt-auto">
              <Link to="/login" className="relative flex items-center">
                <span className="text-xs text-black ">
                  <UserIcon className="w-6 h-6" />
                </span>
              </Link>
            </div> */}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
