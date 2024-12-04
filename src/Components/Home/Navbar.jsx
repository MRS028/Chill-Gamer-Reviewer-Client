import React, { useContext, useState } from "react";
import { FaHome, FaTags } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
// console.log(user.email);







  const links = (
    <>
      <NavLink to="/" className="text-black">
        Home
      </NavLink>
      <NavLink to="/allreviews" className="text-black"> All Reviews</NavLink>
      <NavLink to="/addreview" className="text-black">Add Review</NavLink>
      <NavLink to="/myreviews" className="text-black">My Reviews</NavLink>
      <NavLink to="/game-watchlist" className="text-black">Game Watchlist</NavLink>
    </>
  );

  return (
    <div>
      <nav className="shadow-lg bg-gray-200 text-gray-200">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-400">🎮 Chill Gamer</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">{links}</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="menu-button"
              className="text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Login/Register Buttons (Desktop) */}
          <div className="hidden md:block">
            {
              (user || user?.email) ? <button onClick={logOut} className="btn ">Logout</button> : <>
              <Link to="/auth/login">
              <button className="bg-blue-400 text-gray-900 px-4 py-2 rounded hover:bg-blue-500">
                Login{" "}
              </button>{" "}
            </Link>

            <Link to="/auth/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">
                Register
              </button>{" "}
            </Link>
              </>
            }
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="bg-gray-500 p-5 md:hidden space-x-4">
            {links}
            <div className="flex justify-center mt-2">
            {
              (user || user?.email) ? <button onClick={logOut} className="btn ">Logout</button> : <>
              <Link to="/auth/login">
                <button className="bg-blue-400 text-gray-900 px-4 py-2 rounded hover:bg-blue-500">
                  Login
                </button>
              </Link>

              <Link to="/auth/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">
                Register
              </button>{" "}
            </Link>
              </>
            }
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
