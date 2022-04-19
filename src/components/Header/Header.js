import React from 'react';
import './Header.css';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const Header = () => {
  const naigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    naigate('/');
  };

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand>
          <NavLink to="/">
            <span className="logo-color">Bad</span> Bank{' '}
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <>
                <Tippy content="User can Deposit his money here">
                  <Nav.Item>
                    <NavLink
                      to="/deposit"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Deposit
                    </NavLink>
                  </Nav.Item>
                </Tippy>
                <Tippy content="User can Withdraw his money here">
                  <Nav.Item>
                    <NavLink
                      to="/withdraw"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Withdraw
                    </NavLink>
                  </Nav.Item>
                </Tippy>
                <NavDropdown
                  title={
                    user.userName.charAt(0).toUpperCase() +
                    user.userName.slice(1)
                  }
                  id="collasible-nav-dropdown"
                >
                  <Button className="btn btn-primary" onClick={onLogout}>
                    Logout
                  </Button>
                </NavDropdown>
              </>
            ) : (
              <>
                <Tippy content="User will create his bank account here">
                  <Nav.Item>
                    <NavLink
                      to="/create-account"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Create Account
                    </NavLink>
                  </Nav.Item>
                </Tippy>
                <Tippy content="User will login to handle his bank account">
                  <Nav.Item>
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Login
                    </NavLink>
                  </Nav.Item>
                </Tippy>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
