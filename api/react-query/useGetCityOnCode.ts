import { useQuery } from "@tanstack/react-query";
import { getCityOnCode } from "../getWeather";

const useGetCityDataOnCode = (
    codeCity: string,
    enabled: boolean
) =>
    useQuery(
        ["getCityDataOnCode", codeCity],
        () => getCityOnCode(codeCity),
        { enabled: enabled }
    );
export default useGetCityDataOnCode;
