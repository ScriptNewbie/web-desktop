import axios from "axios";
import React, { useEffect, useState } from "react";

function Weather() {
  const [city, setCity] = useState("Katowice");
  const [temp, setTemp] = useState(20);
  const [weather, setWeather] = useState("Słonecznie");
  const [icon, setIcon] = useState("10d");
  const [osmAttribution, setOsmAttribution] = useState("");

  //API KEY IS STILL BUNDLED SO PROCEED WITH CAUSION
  const key = process.env.REACT_APP_API_KEY;

  const geoCode = async (city) => {
    const query =
      "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
      city;
    const { data } = await axios.get(query);

    if (data.length > 0) {
      return {
        success: true,
        lat: data[0].lat,
        lon: data[0].lon,
        attribution: data[0].licence,
      };
    }
    return { success: false };
  };

  const getWeather = async (lat, lon) => {
    const query =
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      key +
      "&lang=pl&units=metric&lat=" +
      lat +
      "&lon=" +
      lon;
    const { data } = await axios.get(query);
    if (data.coord) {
      const {
        coord,
        weather: [{ id, description, icon }],
        main: { temp },
        name,
      } = data;

      const name_query =
        "https://nominatim.openstreetmap.org/reverse?format=json&limit=1&addressdetails=0&zoom=10&lat=" +
        coord.lat +
        "&lon=" +
        coord.lon;
      const { data: name_data } = await axios.get(name_query);

      return {
        success: true,
        weather: description.charAt(0).toUpperCase() + description.slice(1),
        temp: temp,
        icon: icon,
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

  const setEverything = (temp, weather, icon, city, osmAttribution) => {
    setTemp(temp);
    setWeather(weather);
    setIcon(icon);
    setCity(city);
    setOsmAttribution(osmAttribution);
  };
  const updateWeather = async () => {
    const { success: geoSuccess, lat, lon, attribution } = await geoCode(city);
    if (geoSuccess) {
      const {
        success,
        weather,
        temp,
        icon,
        city,
        attribution: nameAttribution,
      } = await getWeather(lat, lon);
      if (success) {
        setEverything(
          Math.round(temp),
          weather,
          icon,
          city,
          attribution === nameAttribution
            ? attribution
            : attribution + " " + nameAttribution
        );
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const { success, weather, temp, icon, city, attribution } =
            await getWeather(latitude, longitude);
          if (success) {
            setEverything(Math.round(temp), weather, icon, city, attribution);
          }
        },
        () => {
          updateWeather();
        }
      );
    } else {
      updateWeather();
    }
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateWeather();
        }}
      >
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onBlur={updateWeather}
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
      <img style={{ height: "2em" }} src={require("./owm.png")} />
      <br />
      {osmAttribution}
    </div>
  );
}

export default Weather;
