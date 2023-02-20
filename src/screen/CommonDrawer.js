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

import { NavLink } from "react-router-dom";
import Logo from "../core/components/Logo";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../store/drawer/drawerAction";
import { drawerCollapsedWidth, drawerWidth } from "../core/config/layout.js";
import {
  Avatar,
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

const CommonDrawer = () => {
  const [AdminPathHandler, setAdminPathHandler] = useState(`/user/profile`);
  const { auth, drawerData } = useSelector((state) => state);
  const width = drawerData.collapsed ? drawerCollapsedWidth : drawerWidth;
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        boxShadow: 1,
      }}
    >
      <Logo sx={{ display: "flex", p: 4 }} />
      <List component="nav" sx={{ px: 2 }}>
        {(roleType === "user" ? userItem : adminItme).map((item, index) => (
          <ListItem button key={index}>
            <NavLink
              className={(props) => {
                return `${props.isActive ? "isActive " : ""}NavLink`;
              }}
              end={true}
              to={item.path}
            >
              <ListItemAvatar>
                <Avatar sx={{ color: "black", bgcolor: "transparent" }}>
                  <item.icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.key}
                sx={{
                  display: drawerData.collapsed ? "none" : "block",
                }}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
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
    <Box
      aria-label="Admin drawer"
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={drawerData.isOpen}
        onClose={() => {
          dispatch(toggleDrawer());
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
export default CommonDrawer;
