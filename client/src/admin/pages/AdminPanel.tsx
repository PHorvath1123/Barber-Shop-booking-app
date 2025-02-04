import { Outlet } from "react-router-dom";
import { useState } from "react";
import { colorPalette as color } from "../../utils/colorPalette";
import { NavLink } from "react-router-dom";
//*Responsive Drawer
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
//*Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 200;

const menuItems = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "" },
  { title: "Bookings", icon: <CalendarMonthIcon />, path: "bookings" },
  { title: "Customers", icon: <GroupIcon />, path: "customers" },
  { title: "Employees", icon: <WorkIcon />, path: "employees" },
  { title: "Messages", icon: <MessageIcon />, path: "messages" },
  { title: "Statistic", icon: <BarChartIcon />, path: "statistic" },
  { title: "Sign Out", icon: <ExitToAppIcon />, path: "signout" },
];

export default function AdminPanel() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider
        sx={{
          borderColor: color.action,
        }}
      />
      <List>
        {menuItems.map((item) => (
          <NavLink
            to={`/admin/${item.path}`}
            end
            key={item.title}
            className={({ isActive }) => (isActive ? "text-action" : "")}
          >
            {({ isActive }) => (
              <ListItem sx={{ marginTop: "2rem" }} disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{ color: isActive ? color.action : color.light }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ ":hover": { color: color.action } }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: color.adminHeaderDark,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="text-md font-text">Admin Panel</div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: color.adminHeaderDark,
              color: color.light,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: color.adminCardDark,
              color: color.light,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          marginTop: "56px",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: color.adminMainDark,
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
