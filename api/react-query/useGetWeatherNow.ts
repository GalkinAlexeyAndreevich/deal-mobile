import { useQuery } from "@tanstack/react-query";
import { getCityDataOnCoordination, getCityOnCode, getWeatherNow } from "../getWeather";

const useGetWeatherNow = (
    codeCity: string,
) =>
    useQuery(
        ["getWeatherNow", codeCity],
        () => getWeatherNow(codeCity),
    );
export default useGetWeatherNow;