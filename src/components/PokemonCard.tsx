import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import TypeIcon from "./TypeIcon";
import { Pokemon } from "../models/Pokemon";
import { useNavigate } from "react-router-dom";
import Sprite from "./Sprite";

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();
  return (
    <Box mb={2} mt={2} ml={1} mr={1}>
      <Card
        sx={{
          flex: "1 1 0",
          display: "flex",
          height: "100%",
          marginLeft: "64px",
          marginRight: "64px",
          transform: "scale(1)",
          filter: "blur(0)",
          transition: "transform 0.3s ease, filter 0.3s ease",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.05)",
            "& .hover-effect": {
              transform: "scale(1)",
              filter: "blur(4px)",
            },
          },
        }}
        onClick={() => {
          navigate(`/page/${pokemon.id}`, {
            state: {
              pokemon: pokemon,
            },
          });
        }}
      >
        <Box sx={{ width: 96, height: 96, marginLeft: "10px" }} alignSelf="center">
          <Sprite pokemon={pokemon} height={96} width={96} />
        </Box>

        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h2"
            textTransform={"capitalize"}
            sx={{ color: "text.primary" }}
          >
            {pokemon.species.name}
          </Typography>

          <Grid container spacing={1} direction="column">
            <Grid item>
              <TypeIcon type={pokemon.types[0].type.name} />
            </Grid>
            {pokemon.types[1] && (
              <Grid item>
                <TypeIcon type={pokemon.types[1].type.name} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PokemonCard;
