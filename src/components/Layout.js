import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      {/* <header>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header> */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
