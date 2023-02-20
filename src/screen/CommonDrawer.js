import React, { useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BarChartIcon from "@mui/icons-material/BarChart";
import EventIcon from "@mui/icons-material/Event";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import Logo from "../core/components/Logo";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../store/drawer/drawerAction";
import { drawerCollapsedWidth, drawerWidth } from "../core/config/layout.js";
import {
  Avatar,
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export const adminItme = [
  {
    icon: BarChartIcon,
    key: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: PeopleIcon,
    key: "User Management",
    path: "/admin/usermanagement",
  },
  {
    icon: EventIcon,
    key: "Holiday Management",
    path: "/admin/holidaymanagment",
  },
  {
    icon: EventNoteIcon,
    key: "Leave Management",
    path: "/admin/leavemanagement",
  },
  {
    icon: AccountTreeIcon,
    key: "Projects",
    path: "/admin/projects",
  },
  {
    icon: AddToQueueIcon,
    key: "User Log",
    path: "/admin/userlog",
  },
  {
    icon: MoreTimeIcon,
    key: "Extra Staffing",
    path: "/admin/extrastaffing",
  },
];

export const userItem = [
  {
    icon: BarChartIcon,
    key: "Dashboard",
    path: "/user/dashboard",
  },
  {
    icon: EventIcon,
    key: "Holiday Management",
    path: "/user/holidaymanagment",
  },
  {
    icon: AccountTreeIcon,
    key: "Projects",
    path: "/projects",
  },
  {
    icon: EventNoteIcon,
    key: "Leave-Management",
    path: "/user/leavemanagement",
  },
  {
    icon: LocalOfferIcon,
    key: "Tags",
    path: "/user/tag",
  },
  {
    icon: EventNoteIcon,
    key: "Toggle",
    path: "/user/toggle",
  },
  {
    icon: MoreTimeIcon,
    key: "Extra Staffing",
    path: "/user/extrastaffing",
  },
];

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard"];

const CommonDrawer = () => {
  const [AdminPathHandler, setAdminPathHandler] = useState(`/user/profile`);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { auth, drawerData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const roleType = localStorage.getItem("role");

  React.useEffect(() => {
    if (roleType === "user") {
      setAdminPathHandler("/user/profile");
    } else if (roleType === "admin") {
      setAdminPathHandler("/admin/profile");
    }
  }, [roleType]);

  const drawer = (
    <Box>
      {(roleType === "user" ? userItem : adminItme).map((item, index) => (
        <MenuItem key={index} onClick={handleCloseNavMenu}>
          <Avatar sx={{ color: "black", bgcolor: "transparent" }}>
            <item.icon />
          </Avatar>
          <Typography textAlign="center">{item.key}</Typography>
        </MenuItem>
      ))}
      <List component="nav" sx={{ p: 2 }}>
        <ListItem button component={NavLink} to={AdminPathHandler}>
          <ListItemAvatar>
            {auth?.data?.image === "" ? (
              <Avatar>
                <PersonIcon />
              </Avatar>
            ) : (
              <Avatar
                src={`${process.env.REACT_APP_SERVICE_URL}/${auth?.data?.image}`}
                alt="Profile"
              />
            )}
          </ListItemAvatar>
          <ListItemText
            style={{ textTransform: "capitalize" }}
            primary={auth?.data?.firstName || "User"}
            sx={{
              display: drawerData.collapsed ? "none" : "block",
            }}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <ExitToAppIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={"Logout"}
            sx={{
              display: drawerData.collapsed ? "none" : "block",
            }}
          />
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <AppBar
        position="static"
        sx={{
          // backgroundColor: "#131414",
          height: "fit-content",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {drawer}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {(roleType === "user" ? userItem : adminItme).map(
                (item, index) => (
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {item.key}
                  </Button>
                ),
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ListItemAvatar>
                    {auth?.data?.image === "" ? (
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    ) : (
                      <Avatar
                        src={`${process.env.REACT_APP_SERVICE_URL}/${auth?.data?.image}`}
                        alt={auth?.data?.name.toUpperCase()}
                      />
                    )}
                  </ListItemAvatar>

                  {/* <Avatar
                    alt="Remy Sharp"
                    src={`${process.env.REACT_APP_SERVICE_URL}/${auth?.data?.image}`}
                  /> */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <ListItem
                  button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  <ListItemText
                    primary={"Logout"}
                    sx={{
                      display: drawerData.collapsed ? "none" : "block",
                    }}
                  />
                </ListItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default CommonDrawer;
