import React from 'react';
import Login from './Login';
import Header from '../Components/Header';
import Footer from '../Components/Home/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Home/Navbar';

const AuthLaoyout = () => {
    return (
        <div className="text-center">
       <Header></Header>
        <section className="min-h-[calc(100vh-250px)]">
          <Outlet />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    );
};

export default AuthLaoyout;