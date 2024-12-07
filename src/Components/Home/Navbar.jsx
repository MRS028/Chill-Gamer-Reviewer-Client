import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import logo from "../../assets/logo1.png";

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
        confirmButton: "bg-red-600 text-white hover:bg-red-700",
        cancelButton: "bg-gray-400 text-white hover:bg-gray-500",
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
      <li className="inline-block mx-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#30beba] hover:text-green-600 hover:underline  transition-all duration-300 text-lg font-bold"
              : "text-[#30beba] hover:text-green-600 hover:underline font-medium transition-all duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="inline-block mx-4">
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            isActive
              ? "text-[#30beba] hover:text-green-600 hover:underline  transition-all duration-300 text-lg font-bold"
              : "text-[#30beba] hover:text-green-600 hover:underline font-medium transition-all duration-300"
          }
        >
          All Reviews
        </NavLink>
      </li>
      <li className="inline-block mx-4">
        <NavLink
          to="/addReview"
          className={({ isActive }) =>
            isActive
              ? "text-[#30beba] hover:text-green-600 hover:underline font-bold transition-all duration-300 text-lg "
              : "text-[#30beba] hover:text-green-600 hover:underline font-medium transition-all duration-300"
          }
        >
          Add Review
        </NavLink>
      </li>
      <li className="inline-block mx-4">
        <NavLink
          to="/myreviews"
          className={({ isActive }) =>
            isActive
              ? "text-[#30beba] hover:text-green-600 hover:underline transition-all duration-300 text-lg font-bold"
              : "text-[#30beba] hover:text-green-600 hover:underline font-medium transition-all duration-300"
          }
        >
          My Reviews
        </NavLink>
      </li>
      <li className="inline-block mx-4">
        <NavLink
          to="/myWatchlist"
          className={({ isActive }) =>
            isActive
              ? "text-[#30beba] hover:text-green-600 hover:underline  transition-all duration-300 text-lg font-bold"
              : "text-[#30beba] hover:text-green-600 hover:underline font-medium transition-all duration-300"
          }
        >
          My Watchlist
        </NavLink>
      </li>
      <li className="inline-block mx-4">
        <input
          type="checkbox"
          className="toggle toggle-primary"
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
        <div className="container mx-auto flex items-center justify-between py-2 px-6">
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold text-[#30beba] hover:text-green-600">
            <img
              className="w-14  rounded-full inline-block"
              src={logo}
              alt=""
            />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] to-[#30beba] text-shadow-lg hover:scale-110 transform transition-all duration-300">
              Chill Gamer
            </span>
          </h1>

          {/* Desktop Menu */}

          <div className="hidden lg:flex space-x-6">{links}</div>
          <div className="hidden  lg:block">
            {user && user?.email ? (
              <>
                <div
                  className="tooltip tooltip-bottom pr-3 text-base-content font-semibold"
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
                  className="btn bg-red-500 hover:bg-red-700 font-semibold dark:text-white "
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

          {/* mobile menu button */}
          <div className="lg:hidden">
            {user && user?.email ? (
              <div
                className="tooltip tooltip-bottom pr-3 text-base-content font-semibold"
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
              className="text-base-content"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
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

        {/* mobile section */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-base-200 bg-opacity-50 z-50">
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl "
              >
                <svg
                  className="w-10 h-12 text-red-600 bg-base-200 font-bold"
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
            {/* flip navbar */}
            <div className="flex flex-col md:grid w-[80%] grid-cols-2 mx-auto items-center rounded-lg overflow-hidden justify-center h-[60%] bg-base-100 text-lg space-y-4">
              {links}
              <div className="mt-4">
                {user && user?.email ? (
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-500  dark:text-white py-3 px-6 rounded-md hover:bg-red-700"
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
