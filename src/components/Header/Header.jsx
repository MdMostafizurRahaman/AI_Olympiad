import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { MdMenu, MdOutlineMenuOpen, MdLightMode } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { TbWorldPin } from "react-icons/tb";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { BiSolidBellRing } from "react-icons/bi";
import Logout from '@mui/icons-material/Logout';
import SearchBox from "../SearchBox";
import '../../index.css';
import { CgProfile } from "react-icons/cg";
import { FaShieldAlt } from "react-icons/fa";
import { Mycontext } from '../../App';
import AIChatbotModal from './AIChatbotModal';
import { auth } from '../../authService';
import './Header.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(Mycontext);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateNotification = () => {
    if (context.currentLocationData) {
      setNotifications((prev) => [
        `(${prev.length + 1}) AQI at ${context.currentLocationData.location}: ${context.currentLocationData.aqi}. Temp: ${context.currentLocationData.temperature}°C, Humidity: ${context.currentLocationData.humidity}%`,
        ...prev,
      ]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateNotification();
    }, 60000);
    return () => clearInterval(interval);
  }, [context.currentLocationData]);

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          <div className="col-sm-1 part1">
            <Link to="/" className="logo d-flex align-items-center">
              <img src={logo} alt="Logo" />
              <span>AQI</span>
            </Link>
          </div>

          <div className="col-xs-3 d-flex align-items-center part2">
            <Button className="rounded-circle mr-3" onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
              {context.isToggleSidebar ? <MdOutlineMenuOpen /> : <MdMenu />}
            </Button>
            <SearchBox />
          </div>

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            <Tooltip title="Theme Change">
              <Button className="rounded-circle mr-3" onClick={() => context.setThemeMode(!context.themeMode)}>
                <MdLightMode />
              </Button>
            </Tooltip>

            <Tooltip title="Current AQI">
              <Button className="rounded-circle mr-3">
                <TbWorldPin />
              </Button>
            </Tooltip>

            <Tooltip title="AI ChatBot">
              <Button className="rounded-circle mr-3" onClick={() => setIsChatbotOpen(true)}>
                <RiChatVoiceAiFill />
              </Button>
            </Tooltip>
            <AIChatbotModal open={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

            <Tooltip title={`Notifications (${notifications.length})`}>
              <Button className="rounded-circle mr-3" onClick={() => setShowNotifications(!showNotifications)}>
                <BiSolidBellRing />
              </Button>
            </Tooltip>
            {showNotifications && (
              <div className="notification-dropdown">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <p key={index}>{notification}</p>
                  ))
                ) : (
                  <p>No notifications</p>
                )}
              </div>
            )}

            {context.isLogin !== true ? (
              <Link to={'/login'}>
                <Button className='btn-blue'>Sign In</Button>
              </Link>
            ) : (
              <div className="myAccWrapper">
                <Tooltip title="Account settings">
                  <Button className="myAcc d-flex align-items-center" onClick={handleMenuOpen}>
                    <div className="userImg">
                      <span className="rounded-circle">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar" />
                      </span>
                    </div>
                    <div className="userInfo">
                      <h4>{auth.currentUser?.displayName || "Unknown"}</h4>
                      <p className="mb-0">{auth.currentUser?.email || "@userID"}</p>
                    </div>
                  </Button>
                </Tooltip>

                <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  sx={{ mt: 1, "& .MuiMenu-paper": { padding: "10px" } }}>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><CgProfile fontSize="small" /></ListItemIcon>
                    My profile
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><FaShieldAlt fontSize="small" /></ListItemIcon>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;