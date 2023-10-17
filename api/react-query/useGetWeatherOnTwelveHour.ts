import { useQuery } from "@tanstack/react-query";
import { getCityDataOnCoordination, getCityOnCode, getWeatherNow, getWeatherOnFiveDays, getWeatherOnTwelveHour } from "../getWeather";

const useGetWeatherOnTwelveHour = (
    codeCity: string,
) =>
    useQuery(
        ["getWeatherOnTwelveHour", codeCity],
        () => getWeatherOnTwelveHour(codeCity),
    );
export default useGetWeatherOnTwelveHour;
