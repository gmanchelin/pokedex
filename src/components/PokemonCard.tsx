import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import TypeIcon from "./TypeIcon";
import { Pokemon } from "../models/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Grid
      container
      xs={12}
      sm={6}
      md={4}
      mb={2}
      lg={3}
      xl={3}
      mt={3}
    >
      <Card
        sx={{
          flex: "1 1 0",
          display: "flex",
          height: "100%",
          marginLeft: "32px",
          marginRight: "16px",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.1)",
            transition: "transform 0.3s ease, filter 0.3s ease",
            "& .hover-effect": {
              transform: "scale(1)",
              filter: "blur(12px)",
            },
          },
        }}
      >
        <Box sx={{ position: "relative", width: 96, height: 96 }}>
          <CardMedia
            component="img"
            sx={{
              width: 96,
              height: 96,
              marginLeft: "10px",
              //Propriétés pour positionner l'image par-dessus l'autre
              position: "absolute",
              zIndex: 1,
            }}
            image={pokemon.sprites.other.home.front_default}
          />
          <CardMedia
            component="img"
            className="hover-effect"
            sx={{
              width: 96,
              height: 96,
              marginLeft: "10px",
              //Propriété de transition lue dans le hover de la Card
              transition: "transform 0.3s ease, filter 0.3s ease",
            }}
            image={pokemon.sprites.other.home.front_default}
          />
        </Box>

        <CardContent sx={{ flex: "1 0 auto" }} >
          <Typography component="div" variant="h4" textTransform={"capitalize"}>
            {pokemon.species.name}
          </Typography>

          <Grid container spacing={1} direction="column" >
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
    </Grid>
  );
}

export default PokemonCard;
