import { Box } from "@mui/material";
import { User } from "../models/User";

interface ProfilePageProps {
    user: User;
}
function ProfilePage({ user }: ProfilePageProps) {
    return (
        <Box
            key="pokedex-icon"
            component={"img"}
            src={user.img}
        >

        </Box>
    );
}

export default ProfilePage;