import { useQuery } from "@tanstack/react-query";
import { getCityDataOnCoordination } from "../getWeather";
import { ICoordination } from "../../interfaces";

const useGetCityDataOnCoordination = (
    coordination: ICoordination,
    enabled: boolean
) =>
    useQuery(
        ["getCityDataOnCoordination", coordination],
        () => getCityDataOnCoordination(coordination),
        { enabled: enabled, cacheTime: 100000 }
    );
export default useGetCityDataOnCoordination;
