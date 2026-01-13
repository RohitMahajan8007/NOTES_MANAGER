import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdLightbulbOutline,
  MdArchive,
  MdDeleteOutline,
  MdNotifications,
} from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: "Notes", icon: <MdLightbulbOutline size={24} />, path: "/" },
    {
      name: "Reminders",
      icon: <MdNotifications size={24} />,
      path: "/reminders",
    },
    { name: "Archive", icon: <MdArchive size={24} />, path: "/archive" },
    { name: "Trash", icon: <MdDeleteOutline size={24} />, path: "/trash" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-header-mobile">
        <span className="sidebar-logo">Note Manager</span>
      </div>

      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={onClose}
        >
          <div className="icon-container">{item.icon}</div>
          <span className="label">{item.name}</span>
        </NavLink>
      ))}

     
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          padding-top: 8px;
          transition: width 0.2s, transform 0.2s;
          flex-shrink: 0;
          background-color: var(--bg-color);
          height: 100%; 
        }
        .sidebar-header-mobile {
            display: none;
            padding: 16px 24px;
            font-size: 20px;
            font-weight: 500;
            color: var(--text-secondary);
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 8px;
            position: relative;
            z-index: 1200; /* Ensure header is above overlay */
        }
        .sidebar.closed {
          width: var(--sidebar-collapsed-width);
        }
        .sidebar.closed .label {
          display: none;
        }
        .nav-item {
          display: flex;
          align-items: center;
          height: 48px;
          padding-left: 24px; 
          border-radius: 0 25px 25px 0;
          text-decoration: none;
          color: #ffffff;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden; 
          position: relative;
          z-index: 1200; /* Ensure items are clickable/above overlay */
        }
        .sidebar.closed .nav-item {
          padding-left: 14px; 
          border-radius: 50%;
          width: 48px;
          margin-left: 12px;
        }
        .nav-item:hover {
          background-color: var(--btn-hover);
        }
        .nav-item.active {
          background-color: var(--highlight-color);
        }
        .nav-item.active:hover {
          background-color: var(--highlight-color); 
        }
        .icon-container {
          margin-right: 20px;
          color: #ffffff;
          min-width: 24px;
        }
        .nav-item.active .icon-container {
          color: #ffffff;
        }
        .sidebar.closed .icon-container {
          margin-right: 0;
        }
        .label {
          font-weight: 500;
          font-size: 14px;
          letter-spacing: .01785714em;
          font-family: 'Google Sans', Roboto, Arial, sans-serif;
          color: #ffffff;
        }

        /* Mobile Responsive */
        .sidebar-overlay {
            display: none;
        }
        
        @media (max-width: 768px) {
            .sidebar {
                position: fixed;
                top: 0; 
                left: 0;
                bottom: 0;
                height: 100vh;
                z-index: 1100;
                box-shadow: 4px 0 8px rgba(0,0,0,0.3);
                width: 280px; 
                transform: translateX(0);
                background-color: #202124; 
                padding-top: 0;
            }
            .sidebar.closed {
                width: 0;
                padding: 0;
                border: none;
                transform: translateX(-100%);
                opacity: 0;
                pointer-events: none;
            }
            .sidebar-header-mobile {
                display: block;
            }
            .sidebar-overlay {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.5);
                z-index: 1050; /* Overlay is BELOW items (1200) but ABOVE main content */
            }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
