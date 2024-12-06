import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // smooth scroll
    });
  };
  
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link onClick={scrollToTop} to='/'><h2 className="text-lg font-bold text-[#30beba] mb-4">
            <Typewriter
              words={["🎮 Chill Gamer"]}
              loop={10}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={25}
            />
          </h2></Link>
          <p className="text-sm text-gray-400">
            Discover and review your favorite games on Chill Gamer. Stay updated
            with the latest game reviews and share your experiences with a
            growing community of gamers.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg font-bold text-[#30beba] mb-4">
            <Typewriter
              words={["  Quick Links"]} 
              loop={10} 
              cursor
              cursorStyle="|"
              typeSpeed={40} 
              deleteSpeed={25}
            />
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/allreviews" className="hover:text-blue-400">
                All Reviews
              </Link>
            </li>
            <li>
              <Link to="/addreview" className="hover:text-blue-400">
                Add Review
              </Link>
            </li>
            <li>
              <Link to="/game-watchlist" className="hover:text-blue-400">
                Game Watchlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#30beba] mb-4">
          <Typewriter
              words={["Follow Us"]} 
              loop={10} 
              cursor
              cursorStyle="|"
              typeSpeed={40} 
              deleteSpeed={25}
            />

          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Connect with us on social media for updates and exclusive content.
          </p>
          <div className="flex space-x-4 text-lg justify-center">
            <a
              href="https://facebook.com"
              className="bg-gray-700 hover:bg-[#30beba] p-2 rounded-full text-white"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="bg-gray-700 hover:bg-[#30beba] p-2 rounded-full text-white"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="bg-gray-700 hover:bg-pink-500 p-2 rounded-full text-white"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              className="bg-gray-700 hover:bg-[#30beba] p-2 rounded-full text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Chill Gamer. All rights reserved.
        </p>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/your-profile"
            className="text-blue-400 hover:text-blue-500"
          >
           <strong className="text-[#30beba]"> Md.Rifat Sheikh</strong>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
