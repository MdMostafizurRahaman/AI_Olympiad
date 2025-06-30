import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { FaHeadSideMask } from "react-icons/fa";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ImNewspaper } from "react-icons/im";
import { MdMultilineChart } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import SettingsIcon from '@mui/icons-material/Settings';
import { FaBrain } from "react-icons/fa"; // NEW: Import Brain icon
import { Mycontext } from '../App';
import AIChatbotModal from './Header/AIChatbotModal';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Define the state for the modal

    const context = useContext(Mycontext);

    const isOpenSubMenu = (index) => {
        setActiveTab(index);
        setIsToggleSubMenu(!isToggleSubMenu);
    }

    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to="/">
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => isOpenSubMenu(0)}>
                            <span className='icon'>
                                <RxDashboard />
                            </span>
                            Dashboard
                            <span className='arrow'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Button className={`w-100 ${activeTab === 1 && isToggleSubMenu === true ? 'active' : ''}`} onClick={() => isOpenSubMenu(1)}>
                        <span className='icon'>
                            <EnhancedEncryptionIcon />
                        </span>
                        Authentication
                        <span className='arrow'>
                            <MdOutlineKeyboardArrowRight />
                        </span>
                    </Button>

                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubMenu === true ? 'colapse' : 'colapsed'}`}>
                        <ul className="submenu">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to={'/signUp'}>Register</Link></li>
                            <li><Link to={'/forgot-password'}>Forgot Password</Link></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Link to="/air-quality-index">
                        <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} onClick={() => isOpenSubMenu(2)}>
                            <span className='icon'>
                                <LeaderboardIcon />
                            </span>
                            Air quality index
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/forecast">
                        <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`} onClick={() => isOpenSubMenu(3)}>
                            <span className='icon'>
                                <OnlinePredictionIcon />
                            </span>
                            AQ Forecast
                        </Button>
                    </Link>
                </li>

                {/* NEW: AI Mood Analysis Link */}
                <li>
                    <Link to="/mood-analysis">
                        <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`} onClick={() => isOpenSubMenu(4)}>
                            <span className='icon'>
                                <FaBrain />
                            </span>
                            AI Mood Analysis
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/aqi-ranking">
                        <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`} onClick={() => isOpenSubMenu(5)}>
                            <span className='icon'>
                                <MdMultilineChart />
                            </span>
                            AQI Ranking
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/safety">
                        <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`} onClick={() => isOpenSubMenu(6)}>
                            <span className='icon'>
                                <FaHeadSideMask />
                            </span>
                            Safety Measurement
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/recommerndations">
                    <Button className={`w-100 ${activeTab===7 ? 'active' : ''}`} onClick={()=>isOpenSubMenu(7)} >
                            <span className='icon'>
                                <HelpOutlineIcon />
                            </span>
                            Recommendations
                        </Button>
                    </Link>
                
                </li>

                <li>
                    <Link to="/daily-report">
                        <Button className={`w-100 ${activeTab === 8 ? 'active' : ''}`} onClick={() => isOpenSubMenu(8)}>
                            <span className='icon'>
                                <TbReport />
                            </span>
                            Daily Reports
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/notification">
                        <Button className={`w-100 ${activeTab === 9 ? 'active' : ''}`} onClick={() => isOpenSubMenu(9)}>
                            <span className='icon'>
                                <SettingsIcon />
                            </span>
                            Notification Settings
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/news">
                        <Button className={`w-100 ${activeTab === 10 ? 'active' : ''}`} onClick={() => isOpenSubMenu(10)}>
                            <span className='icon'>
                                <ImNewspaper />
                            </span>
                            News
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;