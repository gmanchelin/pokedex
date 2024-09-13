import { ButtonBase, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TypesColor } from "../models/TypesColor";

interface TypeIconProps {
  type: string;
  onClick?: () => void;
  isSelected?: boolean;
}

function TypeIcon(props: TypeIconProps) {
  const typeSvg = `/assets/types_icons/${props.type}.svg`;
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
