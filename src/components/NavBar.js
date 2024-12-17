import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

export default function Navbar() {
  const navRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      const collapseElement = document.querySelector('.custom-nav-collapse');
      if (collapseElement.classList.contains('show')) {
        collapseElement.classList.remove('show');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav ref={navRef} className="custom-navbar">
      <div className="custom-container">
        <Link className="custom-navbar-brand" to="/">My Projects</Link>
        <button
          className="custom-navbar-toggler"
          type="button"
          onClick={() => document.querySelector('.custom-nav-collapse').classList.toggle('show')}
        >
          <span className="custom-navbar-toggler-icon"></span>
        </button>
        <div className="custom-nav-collapse">
          <ul className="custom-navbar-nav">
            <li className="custom-nav-item">
              <Link className="custom-nav-link" to="/">Home</Link>
            </li>
            <li className="custom-nav-item">
              <Link className="custom-nav-link" to="/Calcul">Calculator Project</Link>
            </li>
            <li className="custom-nav-item">
              <Link className="custom-nav-link" to="/Carts">CarteProfile Project</Link>
            </li>
            <li className="custom-nav-item">
              <Link className="custom-nav-link" to="/TodoList">TodoList</Link>
            </li>
            <li className="custom-nav-item">
              <Link className="custom-nav-link" to="/Flags">Flags</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
