import React from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
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
            <Nav.Item>
              <NavLink
                to="/create-account"
                className="nav-link"
                activeClassName="active"
              >
                Create Account
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/deposit"
                className="nav-link"
                activeClassName="active"
              >
                Deposit
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/withdraw"
                className="nav-link"
                activeClassName="active"
              >
                Withdraw
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/all-data"
                className="nav-link"
                activeClassName="active"
              >
                All Data
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
