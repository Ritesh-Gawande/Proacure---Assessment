import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`main ${collapsed ? 'collapsed':''} `}>
      <div className="sidebar-header">
      {/* <span className={`${collapsed ? 'hidden' : 'text-xl font-bold'}`}>Dashboard</span>   */}
        <button onClick={toggleSidebar} className="toggle-button">
        {collapsed ? '☰' : '✖'}
        </button>
      </div>
      {!collapsed && (
      <ul className="sidebar-links">
        <div className='top-side'>
        <li >
          <Link to="/">Home</Link>
        </li>
        <li >
          <Link to="/new-item">New Item</Link>
        </li>
        </div>
        <div className='bottom-side'>
        <li >
          <Link to="/">Help</Link>
        </li>
        <li >
          <Link to="/">Logout </Link>
        </li>
        </div>
      </ul>
      )}
    </div>
  );
};

export default Sidebar;
