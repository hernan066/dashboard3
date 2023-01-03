/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import {
  collapseItem,
  collapseItemSub,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";
import { useMaterialUIController } from "context";
import { useState } from "react";
import { Collapse, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

function SidenavCustom({ menu }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.split("/").splice(1);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360 }} component="nav">
      <ListItem onClick={handleClick}>
        <MDBox
          sx={(theme) =>
            collapseItem(theme, {
              active: collapseName.includes(menu.key),
              transparentSidenav,
              whiteSidenav,
              darkMode,
              sidenavColor,
            })
          }
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active: true })
            }
          >
            <Icon sx={(theme) => collapseIcon(theme, { active: true })}>{menu.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            primary={menu.name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active: true,
              })
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </MDBox>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu.subRoutes.map((sub) => (
            <NavLink to={sub.url} key={sub.url}>
              <ListItem>
                <MDBox
                  ml={3}
                  sx={(theme) =>
                    collapseItemSub(theme, {
                      active: location.pathname === sub.url,
                      transparentSidenav,
                      whiteSidenav,
                      darkMode,
                      sidenavColor,
                    })
                  }
                >
                  <ListItemIcon
                    sx={(theme) =>
                      collapseIconBox(theme, {
                        transparentSidenav,
                        whiteSidenav,
                        darkMode,
                        active: false,
                      })
                    }
                  >
                    <Icon sx={(theme) => collapseIcon(theme, { active: true })}>{sub.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={sub.name}
                    sx={(theme) =>
                      collapseText(theme, {
                        miniSidenav,
                        transparentSidenav,
                        whiteSidenav,
                        active: false,
                      })
                    }
                  />
                </MDBox>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default SidenavCustom;
