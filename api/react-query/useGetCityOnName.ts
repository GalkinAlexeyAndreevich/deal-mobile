import { useQuery } from "@tanstack/react-query";
import { getCityDataOnName } from "../getWeather";

const useGetCityDataOnName = (cityName: string, enabled: boolean) =>
    useQuery(
        ["getCityDataOnName", cityName],
        () => getCityDataOnName(cityName),
        { enabled: enabled }
    );
export default useGetCityDataOnName;
