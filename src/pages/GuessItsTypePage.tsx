import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { LAST_POKEMON_ID } from "../models/SharedValues";
import { getPokemon } from "../models/SharedFunctions";
import TypeIcon from "../components/TypeIcon";
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import Sprite from "../components/Sprite";

function GuessItsTypePage() {
  const [id, setId] = useState<number>(randomNumber);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [numberOfTries, setNumberOfTries] = useState<number>(0);
  const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState<string>("");
  const [isGoodAnswer, setIsGoodAnswer] = useState<boolean>(false);
  
  const types = [
    "normal",
    "grass",
    "fire",
    "water",
    "electric",
    "bug",
    "flying",
    "poison",
    "rock",
    "ground",
    "fighting",
    "psychic",
    "ghost",
    "ice",
    "dragon",
    "steel",
    "dark",
    "fairy",
  ];

  useEffect(() => {
    async function fetchData() {
      setPokemon(await getPokemon(id));
    }
    fetchData();
  }, [id]);

  function randomNumber() {
    return 1 + Math.floor(Math.random() * LAST_POKEMON_ID);
  }

  function handleSubmit() {
    const pokemonTypes = pokemon!.types.map((el) => el.type.name);
    const guess =
      selectedTypes.length === pokemonTypes.length &&
      pokemonTypes.every((type) => selectedTypes.includes(type));
    if (guess) {
      setIsGoodAnswer(true);
      setDisplayedMessage("DING DING! Good answer!");
      setNumberOfGoodAnswers(numberOfGoodAnswers + 1);
    } else {
      setIsGoodAnswer(false);
      setDisplayedMessage(
        `BZZZT! Wrong answer! ${pokemon?.species.name.toUpperCase()} ${
          pokemonTypes.length == 1 ? "type is" : "types are"
        } ${pokemonTypes.join(", ").toUpperCase()}`
      );
    }
    setOpenSnackbar(true);
    setSelectedTypes([]);
    setId(randomNumber());
    setNumberOfTries(numberOfTries + 1);
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSelectType = (type: string) => () => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((element) => element !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    //Si déjà présent dans selectedType on retire, sinon on ajoute
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent={"center"}
        direction={"column"}
      >
        <Grid item>
          <Typography variant="h4" textAlign={"center"}>
            Guess Its Type
          </Typography>
        </Grid>
        <Grid item>
          <Box
            component={"p"}
            textAlign={"center"}
            justifyContent={"space-around"}
            display={"flex"}
          >
            <Typography>Number of tries : {numberOfTries}</Typography>
            <Typography>Good answers : {numberOfGoodAnswers}</Typography>
          </Box>
        </Grid>

        {pokemon?.sprites && (
          <Grid item>
            <Sprite pokemon={pokemon} height={200} width={200} />
            <Typography
              variant="h4"
              textTransform={"capitalize"}
              textAlign="center"
            >
              {pokemon!.species.name}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box component={"p"} textAlign={"center"}>
        <Grid container spacing={2} justifyContent={"center"}>
          {types.map((type) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={type}>
              <TypeIcon
                type={type}
                onClick={handleSelectType(type)}
                isSelected={selectedTypes.includes(type)}
              />
            </Grid>
          ))}

          <Grid item>
            <Button
              disabled={selectedTypes.length === 0}
              onClick={handleSubmit}
            >
              Guess
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={isGoodAnswer ? "success" : "error"}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {displayedMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default GuessItsTypePage;
