import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TypesColor } from "../types-color";

interface TypeIconProps {
  type: string;
}
function TypeIcon(props: TypeIconProps) {
  const typeSvg = `public/assets/types_icons/${props.type}.svg`;
  return (
    <Grid
      item
      display={"flex"}
      sx={{
        borderRadius: "15px",
        backgroundColor: TypesColor[props.type],
        height: "30px",
        width: "150px",
        alignItems: "center",
      }}
    >
      <Box
        key={`type-${props.type}`}
        component={"img"}
        src={typeSvg}
        height={"80%"}
        marginLeft={"5px"}
      ></Box>
      <Box
        sx={{
          flex: 1, // Take up remaining space
          display: "flex",
          justifyContent: "center", // Center horizontally within this box
        }}
      >
        <Typography
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          sx={{ color: "text.secondary" }}
        >
          {props.type}
        </Typography>
      </Box>
    </Grid>
  );
}

export default TypeIcon;
