import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface TypeIconProps {
  type: string;
}
function TypeIcon(props: TypeIconProps) {
  const backgroundColor: { [key: string]: string } = {
    bug: "#91a119",
    dark: "#50413f",
    dragon: "#5061e1",
    electric: "#fac000",
    fairy: "#f170f1",
    fighting: "#ff8000",
    fire: "#e62829",
    flying: "#81b9ef",
    ghost: "#704170",
    grass: "#42a129",
    ground: "#915121",
    ice: "#3fd8ff",
    normal: "#9fa19f",
    poison: "#9040cc",
    psychic: "#ef4179",
    rock: "#afa981",
    steel: "#60a1b8",
    water: "#2980ef",
  };
  console.log(props.type);
  const typeSvg = `src/assets/types_icons/${props.type}.svg`;
  return (
    <Grid
      item
      display={"flex"}
      sx={{
        borderRadius: "15px",
        backgroundColor: backgroundColor[props.type],
        height: "30px",
        width: "150px",
        alignItems: "center",
      }}
    >
      <Box
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
          alignItems: "center", // Center vertically within this box
        }}
      >
        <Typography
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          {props.type}
        </Typography>
      </Box>
    </Grid>
  );
}

export default TypeIcon;
