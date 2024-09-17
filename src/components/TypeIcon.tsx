import { ButtonBase, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface TypeIconProps {
  type: string;
  onClick?: () => void;
  isSelected?: boolean;
}

function TypeIcon(props: TypeIconProps) {
  const typeSvg = `/assets/types_icons/${props.type}.svg`;
  const TypesColor: { [key: string]: string } = {
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
    selected: "#656565",
  };
  return (
    <ButtonBase onClick={props.onClick} disableRipple>
      <Grid
        item
        display={"flex"}
        sx={{
          borderRadius: "15px",
          backgroundColor: props.isSelected
            ? TypesColor["selected"]
            : TypesColor[props.type],
          height: "30px",
          width: "150px",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
          },
          border: props.isSelected ? "4px solid #ffffff" : null,
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
            flex: 1,
            display: "flex",
            justifyContent: "center",
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
    </ButtonBase>
  );
}

export default TypeIcon;
