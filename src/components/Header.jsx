import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdMenu,
  MdSearch,
  MdRefresh,
  MdViewStream,
  MdSettings,
  MdLogout,
  MdDescription,
} from "react-icons/md";

const Header = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" onClick={toggleSidebar}>
          <MdMenu size={24} />
        </button>
        <div className="logo-area">
          <MdDescription size={35} color="#4285f4" />
          <span className="logo-text">Note Manager</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <button className="search-icon-btn">
            <MdSearch size={24} color="#5f6368" />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        {user && (
          <div className="user-profile">
            <Link to="/profile" className="profile-link">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="user-avatar"
                />
              ) : (
                <span className="username" title={user.email}>
                  {user.name}
                </span>
              )}
            </Link>
            <button className="icon-btn" onClick={logout} title="Logout">
              <MdLogout size={24} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .header {
          height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-color);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-left {
          display: flex;
          align-items: center;
          width: 230px; /* Default sidebar width align */
          padding-left: 12px;
          flex-shrink: 0;
        }
        .logo-area {
          display: flex;
          align-items: center;
          margin-left: 4px;
          gap: 8px;
        }
        .logo-text {
          font-size: 22px;
          color: var(--text-secondary);
          line-height: 24px;
          white-space: nowrap;
        }
        .header-center {
          flex: 1;
          max-width: 720px;
          padding: 0 10px;
          min-width: 0; /* Important for flex shrinking */
        }
        .search-bar {
          background: #525355;
          border-radius: 8px;
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 4px;
          transition: background 0.1s, box-shadow 0.1s;
          width: 100%;
        }
        .search-bar:focus-within {
          background: white;
          box-shadow: 0 1px 1px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
        }
        .search-bar:focus-within input {
           color: #202124;
        }
        .search-bar:focus-within .search-icon-btn {
           color: #202124;
        }
        .search-bar input {
          flex: 1;
          height: 100%;
          font-size: 16px;
          color: var(--text-primary);
          padding: 0 8px;
          min-width: 0; /* Prevent overflow */
        }
        .search-icon-btn {
          padding: 8px; 
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9aa0a6;
        }
        .search-icon-btn:hover {
          background-color: rgba(60,64,67,0.08);
          color: var(--text-primary);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 20px;
          flex-shrink: 0;
        }
        .icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: background-color 0.2s;
        }
        .icon-btn:hover {
          background-color: var(--btn-hover);
          color: var(--text-primary);
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .username {
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .profile-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        /* Mobile Responsive Header */
        @media (max-width: 600px) {
            .header {
              padding: 8px 4px;
            }
            .header-left {
                width: auto;
                padding-left: 0;
                margin-right: 4px;
            }
            .header-right {
                padding-right: 4px;
                gap: 2px;
                min-width: 80px; /* Ensure space for profile + logout */
                justify-content: flex-end;
            }
            /* Hide logo text and logo icon on very small, or just text */
            .logo-text {
                display: none;
            }
            .logo-area {
                display: none; 
            }
            
            .header-center {
                padding: 0 4px;
                /* Allow search to shrink a bit to fit profile */
                flex: 1;
            }
            .search-bar {
                height: 40px;
            }
            .search-bar input {
                font-size: 15px;
            }
            
            /* Hide username text but KEEP profile image */
            .username {
                display: none;
            }
            .user-profile {
                gap: 4px;
            }
            .user-avatar {
                width: 32px;
                height: 32px;
                display: block; /* Force show */
            }
            
            .icon-btn {
                width: 36px; /* Slightly smaller buttons on mobile */
                height: 36px;
            }
            .search-icon-btn {
                padding: 4px;
            }
        }
      `}</style>
    </header>
  );
};

export default Header;
