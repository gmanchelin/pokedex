import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Divider, Theme } from "@mui/material";
import { useShinyContext } from "../contexts/ShinyContext";
import { useRetroContext } from "../contexts/RetroContext";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../models/SharedFunctions";

interface RightDrawerProps {
    mode: "light" | "dark";
    setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
    theme: Theme;
}
export default function RightDrawer(props: RightDrawerProps) {
    const [open, setOpen] = React.useState(false);
    const shinyContext = useShinyContext();
    const retroContext = useRetroContext();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [username, setUsername] = React.useState<string>("");

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    function logout() {
        localStorage.removeItem("token");
        navigate("login");
    }

    React.useEffect(() => {
        if (token != null) {
            parseJwt(token!);
            setUsername(parseJwt(token!).sub);
        }
    }, [token]);

    type ListItemArrayType = [React.ReactElement, string, () => void];

    const listItemsArray: ListItemArrayType[] = [
        [
            props.mode === "dark" ? <WbSunnyIcon /> : <DarkModeIcon sx={{ color: props.theme.palette.conditional["true"] }} />,
            props.mode === "dark" ? "Light Mode" : "Dark Mode",
            () => props.setMode(props.mode === "light" ? "dark" : "light")
        ],
        [
            <AutoAwesomeIcon
                sx={{
                    color: props.theme.palette.conditional[
                        shinyContext?.shinyDisplayed ? "true" : "false"
                    ],
                }}
            />,
            "Shiny Mode",
            () => shinyContext.setShinyDisplayed(!shinyContext.shinyDisplayed)
        ],
        [
            <VideogameAssetIcon
                sx={{
                    color: props.theme.palette.conditional[
                        retroContext?.retroDisplayed ? "true" : "false"
                    ],
                }}
            />,
            "Retro Mode",
            () => retroContext.setRetroDisplayed(!retroContext.retroDisplayed)
        ],
    ];

    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {!token &&
                    <ListItem key={"login"} disablePadding>
                        <ListItemButton onClick={() => navigate("login")}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItemButton>
                    </ListItem>}
                {token &&
                    <ListItemButton onClick={() => navigate("profile")}>
                        <ListItem key={"profile"} disablePadding>
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText primary={username} />
                        </ListItem>
                    </ListItemButton>}
                {token &&
                    <ListItem key={"logout"} disablePadding>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>}

                <Divider />
                {listItemsArray.map(([icon, text, f], index) => (
                    <ListItem key={`option-${index}`} disablePadding>
                        <ListItemButton onClick={() => { f() }}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box component={"div"}>
            <Button className="no-theme-style" onClick={toggleDrawer(true)}>
                <SettingsIcon sx={{ color: "text.secondary" }} />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                {drawerList}
            </Drawer>
        </Box>
    );
}
