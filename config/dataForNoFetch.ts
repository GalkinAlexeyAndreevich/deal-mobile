import { IAdditionInfo, IDailyForecasts,IWeatherOnHour, IWeatherNow, IDataCity } from "../interfaces";

export const baseWeatherNow: IWeatherNow = {
    WeatherIcon: "1",
    Temperature: { Metric: { Value: 20 } },
    WeatherText: "Солнечно",
  };

export const baseWeatherDataOnFiveDays:IDailyForecasts[] = [
	{
		Date:new Date('2023-09-22T07:00:00+03:00'),
		Temperature:{
			Maximum:{Value:20},
			Minimum:{Value:10}
		},
        Day:{Icon:1},
        Night:{Icon:2}
	},
	{
		Date:new Date('2023-09-23T07:00:00+03:00'),
		Temperature:{
			Maximum:{Value:20},
			Minimum:{Value:10}
		},
        Day:{Icon:1},
        Night:{Icon:2}
	},
	{
		Date:new Date('2023-09-24T07:00:00+03:00'),
		Temperature:{
			Maximum:{Value:20},
			Minimum:{Value:10}
		},
        Day:{Icon:1},
        Night:{Icon:2}
	},
	{
		Date:new Date('2023-09-25T07:00:00+03:00'),
		Temperature:{
			Maximum:{Value:20},
			Minimum:{Value:10}
		},
        Day:{Icon:1},
        Night:{Icon:2}
	},
    {
		Date:new Date('2023-09-26T07:00:00+03:00'),
		Temperature:{
			Maximum:{Value:20},
			Minimum:{Value:10}
		},
        Day:{Icon:1},
        Night:{Icon:2}
	}
]

export const baseWeatherDataOnTwelveHours:IWeatherOnHour[] = [
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    },
    {
        DateTime:new Date("2023-09-21T14:00:00+03:00"),
        WeatherIcon:7,
        IconPhrase:'Облачно',
        Temperature:{
            Value:20
        }
    }
]

export const baseAdditionInfo:IAdditionInfo = {
    Wind:{
        Direction:{
            Degrees:225,
            Localized:'ЮЗ'
        },
        Speed:{
            Metric:{
                Value:15,
                Unit:'km/h'
            }

        }
    },
    Pressure:{
        Metric:{
			Value:1020
		}
    },
    RelativeHumidity:69
}

export const cityData:IDataCity={
	Key:"293006",
	LocalizedName:"Калуга",
	EnglishName:"Kaluga"
}