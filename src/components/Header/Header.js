import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/manage">Manage Inventory</Link>
        <button className="signOutBtn" onClick={() => setLoggedInUser({})}>
          Sign out
        </button>
      </nav>
    </div>
  );
};

export default Header;
