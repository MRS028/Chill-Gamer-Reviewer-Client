import React, { useContext, useEffect, useState } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user.displayName)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log(user.email);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "bg-red-600 text-white hover:bg-red-700", // Confirm button custom class
        cancelButton: "bg-gray-400 text-white hover:bg-gray-500", // Cancel button custom class
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        navigate("/");
      }
    });
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const links = (
    <>
      <NavLink to="/" className="text-[#30beba]  hover:text-green-600">
        Home
      </NavLink>
      <NavLink to="/allreviews" className="text-[#30beba] hover:text-green-600">
        {" "}
        All Reviews
      </NavLink>
      <NavLink to="/addReview" className="text-[#30beba] hover:text-green-600">
        Add Review
      </NavLink>
      <NavLink to="/myreviews" className="text-[#30beba] hover:text-green-600">
        My Reviews
      </NavLink>
      <NavLink
        to="/game-watchlist"
        className="text-[#30beba] hover:text-green-600"
      >
        Game Watchlist
      </NavLink>
      <li>
        <input
          type="checkbox"
          className="toggle"
          onChange={() => {
            const theme =
              document.documentElement.getAttribute("data-theme") === "dark"
                ? "light"
                : "dark";
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
          }}
          defaultChecked={(() => {
            const savedTheme = localStorage.getItem("theme") || "light"; 
            document.documentElement.setAttribute("data-theme", savedTheme);
            return savedTheme === "dark"; 
          })()}
        />
      </li>
    </>
  );

  return (
    <div>
      <nav className="shadow-lg  text-gray-200 ">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-[#30beba] hover:text-green-600">
            🎮 Chill Gamer
          </h1>

          {/* Desktop Menu */}

          <div className="hidden lg:flex space-x-6">{links}</div>
          <div className="hidden  lg:block">
            {user && user?.email ? (
              <>
                <div
                  className="tooltip tooltip-bottom pr-3 text-white font-semibold"
                  data-tip={user.displayName || "Anonymous User"}
                >
                  <img
                    className="inline-block w-11 h-11 rounded-full cursor-pointer"
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="User Avatar"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="btn bg-red-500 hover:bg-red-700 font-semibold text-white "
                >
                  Log out <IoIosLogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="hidden lg:flex gap-5">
                  <Link to="/auth/login">
                    <button className="btn bg-[#30beba] text-white font-semibold hover:bg-green-600 btn-outline">
                      <IoIosLogIn size={14} />
                      Log In
                    </button>
                  </Link>

                  <Link to="/auth/register">
                    <button className="btn bg-[#30beba] text-white font-semibold hover:bg-green-500 btn-outline">
                      <FaUserPlus size={14} /> Register
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            {user && user?.email ? (
              <div
                className="tooltip tooltip-bottom pr-3 text-white font-semibold"
                data-tip={user?.displayName || "Anonymous User"}
              >
                <img
                  className="inline-block w-11 h-11 rounded-full cursor-pointer"
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                />
              </div>
            ) : (
              ""
            )}
            <button
              id="menu-button"
              className="text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl "
              >
                <svg
                  className="w-10 h-12 text-red-600 font-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:grid grid-cols-2 items-center justify-center h-[70%] bg-gray-100 text-lg space-y-8">
              {links}
              <div className="mt-4">
                {user && user?.email ? (
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-700"
                  >
                    Logout <IoIosLogOut size={18} />
                  </button>
                ) : (
                  <>
                    <div className="flex gap-3 items-center md:mx-20">
                      <Link to="/auth/login">
                        <button className="btn bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 flex items-center gap-2">
                          <IoIosLogIn size={14} />
                          Log In
                        </button>
                      </Link>

                      <Link to="/auth/register">
                        <button className="btn bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 flex items-center gap-2">
                          <FaUserPlus size={14} /> Register
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
