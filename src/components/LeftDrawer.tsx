import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";

export default function LeftDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const listItemsArray = [
    [<QuizIcon />, "Guess Its Type", "/guess-its-type"],
    [<MenuIcon />, "Who's That Pokémon?", "/whos-that-pokemon"],
  ];
  
  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {listItemsArray.map(([icon, text, path], index) => {
          return (
            <ListItem key={`option-${index}`} disablePadding>
              <ListItemButton onClick={() => navigate(path.valueOf())}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box component={"div"}>
      <Button className="no-theme-style" onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: "text.secondary" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </Box>
  );
}
