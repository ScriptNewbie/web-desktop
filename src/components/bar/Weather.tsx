import axios from "axios";
import { useEffect, useState } from "react";
import owmImg from "./owm.png";

type NominatimSearchResult = {
  lat: string;
  lon: string;
  licence: string;
  display_name?: string;
};

type NominatimReverseResult = {
  licence: string;
  display_name?: string;
};

type OpenWeatherResponse = {
  coord: { lat: number; lon: number };
  weather: Array<{ id: number; description: string; icon: string }>;
  main: { temp: number };
  name: string;
};

type GeoCodeResult =
  | { success: true; lat: string; lon: string; attribution: string }
  | { success: false };

type WeatherResult =
  | {
      success: true;
      weather: string;
      temp: number;
      icon: string;
      attribution: string;
      city: string;
    }
  | { success: false };

function Weather() {
  const [city, setCity] = useState("Katowice");
  const [temp, setTemp] = useState(20);
  const [weather, setWeather] = useState("Słonecznie");
  const [icon, setIcon] = useState("10d");
  const [osmAttribution, setOsmAttribution] = useState("");

  //API KEY IS STILL BUNDLED SO PROCEED WITH CAUTION
  const key = import.meta.env.VITE_WEATHER_API_KEY;

  const geoCode = async (queryCity: string): Promise<GeoCodeResult> => {
    const query =
      "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
      queryCity;
    const { data } = await axios.get<NominatimSearchResult[]>(query);
    const firstResult = data[0];

    if (firstResult) {
      return {
        success: true,
        lat: firstResult.lat,
        lon: firstResult.lon,
        attribution: firstResult.licence,
      };
    }
    return { success: false };
  };

  const getWeather = async (
    lat: string | number,
    lon: string | number
  ): Promise<WeatherResult> => {
    const query =
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      key +
      "&lang=pl&units=metric&lat=" +
      lat +
      "&lon=" +
      lon;
    const { data } = await axios.get<OpenWeatherResponse>(query);
    const currentWeather = data.weather[0];
    if (data.coord && currentWeather) {
      const {
        coord,
        main: { temp: currentTemp },
        name,
      } = data;
      const { description, icon: weatherIcon } = currentWeather;

      const name_query =
        "https://nominatim.openstreetmap.org/reverse?format=json&limit=1&addressdetails=0&zoom=10&lat=" +
        coord.lat +
        "&lon=" +
        coord.lon;
      const { data: name_data } =
        await axios.get<NominatimReverseResult>(name_query);

      return {
        success: true,
        weather: description.charAt(0).toUpperCase() + description.slice(1),
        temp: currentTemp,
        icon: weatherIcon,
        attribution: name_data.licence,
        city: name_data.display_name
          ? name_data.display_name
          : name
            ? name
            : city.charAt(0).toUpperCase() + city.slice(1),
      };
    }
    return { success: false };
  };

  const setEverything = (
    nextTemp: number,
    nextWeather: string,
    nextIcon: string,
    nextCity: string,
    nextOsmAttribution: string
  ) => {
    setTemp(nextTemp);
    setWeather(nextWeather);
    setIcon(nextIcon);
    setCity(nextCity);
    setOsmAttribution(nextOsmAttribution);
  };
  const updateWeather = async () => {
    const geoResult = await geoCode(city);
    if (geoResult.success) {
      const weatherResult = await getWeather(geoResult.lat, geoResult.lon);
      if (weatherResult.success) {
        setEverything(
          Math.round(weatherResult.temp),
          weatherResult.weather,
          weatherResult.icon,
          weatherResult.city,
          geoResult.attribution === weatherResult.attribution
            ? geoResult.attribution
            : geoResult.attribution + " " + weatherResult.attribution
        );
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const weatherResult = await getWeather(latitude, longitude);
          if (weatherResult.success) {
            setEverything(
              Math.round(weatherResult.temp),
              weatherResult.weather,
              weatherResult.icon,
              weatherResult.city,
              weatherResult.attribution
            );
          }
        },
        () => {
          void updateWeather();
        }
      );
    } else {
      void updateWeather();
    }
    // Initial weather fetch on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void updateWeather();
        }}
      >
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onBlur={() => {
            void updateWeather();
          }}
          type="text"
        ></input>
      </form>
      <div>{temp}</div>
      <div>{weather}</div>
      <div>
        <img src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"} />
      </div>
      Weather data provided by{" "}
      <a href="https://openweathermap.org/">OpenWeather</a>
      <img style={{ height: "2em" }} src={owmImg} />
      <br />
      {osmAttribution}
    </div>
  );
}

export default Weather;
