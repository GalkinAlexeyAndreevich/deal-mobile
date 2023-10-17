import axios from "axios";
import { API_KEY } from "../config/configAPI";
import {
    ICoordination,
    IDataCity,
    IWeatherOnHour,
    IDailyForecasts,
    TWeatherAndAdditionNow,
} from "../interfaces";

interface IOnDay {
    DailyForecasts: IDailyForecasts[];
}

export const getCityDataOnCoordination = async (coordination: ICoordination) => {
    try {
        console.log(coordination);

        const { latitude, longitude }: ICoordination = coordination;
        const { data } = await axios.get<IDataCity>(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${String(
                latitude + "," + longitude
            )}&language=ru`
        );
        return data;
    } catch (e) {
        console.log("Ошибка");
    }
};

export async  function getCityDataOnName(nameCity: string):Promise<IDataCity[] | undefined> {
    try {
        console.log(nameCity);

        const { data } = await axios.get<IDataCity[]>(
            ` http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${nameCity}&language=ru`
        );
        return data;
    } catch (e) {
        console.log("Ошибка");
    }
};

export async  function getCityOnCode(codeCity: string):Promise<IDataCity | undefined> {
    try {
        console.log(codeCity);

        const { data } = await axios.get<IDataCity>(
            `http://dataservice.accuweather.com/locations/v1/${codeCity}?apikey=${API_KEY}&language=ru&details=true`
        );
        return data;
    } catch (e) {
        console.log("Ошибка");
    }
};

export const getWeatherOnOneDay = async (codeCity: string) => {
    try {
        const { data } = await axios.get<IWeatherOnHour>(
            `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${codeCity}/?apikey=${API_KEY}&metric=true`
        );
        return data;
    } catch (e) {
        console.log("Ошибка");
    }
};



export const getWeatherOnTwelveHour = async (codeCity: string) => {
    try {
        const { data } = await axios.get<IWeatherOnHour[]>(
            `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${codeCity}/?apikey=${API_KEY}&metric=true&language=ru`
        );
        return data;
    } catch (e) {
        console.log("Ошибка");
    }
};

export const getWeatherOnFiveDays = async (codeCity: string) => {
    try {
        const { data } = await axios.get<IOnDay>(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${codeCity}?apikey=${API_KEY}&metric=true&language=ru`
        );
        return data.DailyForecasts;
    } catch (e) {
        console.log("Ошибка");
    }
};


export async function getWeatherNow(codeCity: string): Promise<TWeatherAndAdditionNow | undefined> {
    try {
        console.log(codeCity);

        const { data } = await axios.get<TWeatherAndAdditionNow[]>(
            `http://dataservice.accuweather.com/currentconditions/v1/${codeCity}?apikey=${API_KEY}&language=ru&details=true`
        );
        return data[0];
    } catch (e) {
        console.log("Ошибка");
    }
}



