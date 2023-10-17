import { useQuery } from "@tanstack/react-query";
import { getCityDataOnCoordination, getCityOnCode, getWeatherNow, getWeatherOnFiveDays } from "../getWeather";

const useGetWeatherOnFiveDays = (
    codeCity: string,
) =>
    useQuery(
        ["getWeatherOnFiveDays", codeCity],
        () => getWeatherOnFiveDays(codeCity),
    );
export default useGetWeatherOnFiveDays;
