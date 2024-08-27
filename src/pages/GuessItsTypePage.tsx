import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { LAST_POKEMON_ID } from "../models/SharedValues";
import { getPokemon } from "../models/SharedFunctions";
import TypeIcon from "../components/TypeIcon";
import InfoIcon from '@mui/icons-material/Info';
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Tooltip,
  Typography,
} from "@mui/material";
import Sprite from "../components/Sprite";

function GuessItsTypePage() {
  const [id, setId] = useState<number>(randomNumber);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [numberOfTries, setNumberOfTries] = useState<number>(localStorage.getItem("numberOfTries") ? parseInt(localStorage.getItem("numberOfTries")!) : 0);
  const [streak, setStreak] = useState<number>(localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")!) : 0);
  const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState<number>(localStorage.getItem("numberOfGoodAnswers") ? parseInt(localStorage.getItem("numberOfGoodAnswers")!) : 0);
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
    localStorage.setItem("numberOfTries", numberOfTries.toString());
    localStorage.setItem("numberOfGoodAnswers", numberOfGoodAnswers.toString());
    localStorage.setItem("streak", streak.toString());
    fetchData();
  }, [id, numberOfTries, numberOfGoodAnswers]);

  async function fetchData() {
    setPokemon(await getPokemon(id));
  }

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
      setStreak(streak + 1);
    } else {
      setIsGoodAnswer(false);
      setDisplayedMessage(
        `BZZZT! Wrong answer! ${pokemon?.species.name.toUpperCase()} ${pokemonTypes.length == 1 ? "type is" : "types are"
        } ${pokemonTypes.join(", ").toUpperCase()}`
      );
      setStreak(0);
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
      setSelectedTypes(selectedTypes.length === 2 ? [selectedTypes[0], type] : [...selectedTypes, type]);
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
            <Tooltip
              title={
                <>
                  A random Pokémon appears! You have to guess its type(s) by selecting up to 2 of them. <br />
                  You're helped with the number of types of the Pokémon at first, but things get more spicy as you progress with your streak of good guesses:<br />
                  - Streak of 10 : the number of types is no more displayed<br />
                  - Streak of 30 : the Pokémon's sprite is changed with a gray silhouette <br />
                  - Streak of 50 : only the name of the Pokemon is displayed
                </>
              }
            >
              <IconButton sx={{ "&:hover": { cursor: "pointer" } }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item>
          {pokemon && streak < 50 && (
            <Sprite pokemon={pokemon} height={200} width={200} isGray={streak > 30} />
          )}
          {pokemon && (
            <Typography
              variant="h4"
              textTransform={"capitalize"}
              textAlign="center"
            >
              {pokemon!.species.name}
            </Typography>
          )}
          {pokemon && streak < 10 &&
            <Typography textAlign="center"> Number of types : {pokemon!.types.length}</Typography>
          }
        </Grid>
      </Grid >
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
              <Typography>Streak : {streak}</Typography>
            </Box>
          </Grid>
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
      </Box>
    </>
  );
}

export default GuessItsTypePage;
