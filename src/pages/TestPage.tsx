import { useEffect, useState } from "react";
import { Trainer } from "../models/Trainer";
import { getTrainers } from "../models/SharedFunctions";
import { Box } from "@mui/material";

function TestPage() {

  const [trainers, setTrainers] = useState<Trainer[]>([]);

  async function fetchData() {
    setTrainers(await getTrainers());
  }
  useEffect(() => {
    fetchData();
  }, [trainers]);
  return (
    <>
      {trainers!.map((trainer) => (
        <Box
          key={trainer.name}
          component="img"
          src={trainer.img}
          height={"128px"}
          alt={`trainer ${trainer.name} icon`}
        />
      ))}
    </>
  );
}

export default TestPage;
