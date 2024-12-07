import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Home/Footer';
import { Outlet } from 'react-router-dom';

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