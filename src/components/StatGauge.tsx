import { Typography, Box, LinearProgress } from "@mui/material";
import { CapitalizeAndRemoveHyphen } from "../models/SharedFunctions";

interface StatGaugeProps {
    statName: string;
    statValue: number;
}
export default function StatGauge({ statName, statValue }: StatGaugeProps) {

    const maxValue = 255;
    
    function color(statValue: number) {
        if (statValue < 50) {
            return "error"
        } else if (statValue <= 99) {
            return "warning"
        } else {
            return "success"
        }
    }

    return (
        <Box key={`stat-${statName}`}>
            <Typography textTransform={"capitalize"}>
                {CapitalizeAndRemoveHyphen(statName)} : {statValue}
                <LinearProgress variant="determinate" value={statValue / maxValue * 100} color={color(statValue)} />
            </Typography>
        </Box>
    )
}
