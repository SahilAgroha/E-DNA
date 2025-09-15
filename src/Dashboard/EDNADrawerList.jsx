import React from "react";
import {
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  Code as CodeIcon,
  Science as ScienceIcon,
  BarChart as BarChartIcon,
  AccountBox as AccountBoxIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import DrawerList from "../components/DrawerList";

const menu = [
  {
    name: "Overview",
    path: "/",
    icon: <HomeIcon className="text-gray-400" />,
    activeIcon: <HomeIcon className="text-white" />,
  },
  {
    name: "Data Sources",
    path: "/data-sources",
    icon: <StorageIcon className="text-gray-400" />,
    activeIcon: <StorageIcon className="text-white" />,
  },
  {
    name: "Data Sources",
    path: "/data-sources-2",
    icon: <LockIcon className="text-gray-400" />,
    activeIcon: <LockIcon className="text-white" />,
  },
  {
    name: "Models",
    path: "/models",
    icon: <CodeIcon className="text-gray-400" />,
    activeIcon: <CodeIcon className="text-white" />,
  },
  {
    name: "Experiments",
    path: "/experiments",
    icon: <ScienceIcon className="text-gray-400" />,
    activeIcon: <ScienceIcon className="text-white" />,
  },
  {
    name: "Results",
    path: "/results",
    icon: <BarChartIcon className="text-gray-400" />,
    activeIcon: <BarChartIcon className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon className="text-gray-400" />,
    activeIcon: <SettingsIcon className="text-white" />,
  },
];

const EDNADrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default EDNADrawerList;
