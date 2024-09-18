import { Box, Typography } from "@mui/material";

function LoginPage() {

    return (
        <>
            <Typography variant="h1">Login</Typography>
            <Box component={"p"}>
                Click <a href="@{/hello}">here</a> to see a greeting.
            </Box>
        </>

    );
}

export default LoginPage;