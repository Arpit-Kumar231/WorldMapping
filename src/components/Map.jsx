import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

const Map = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [position, setposition] = useState([0, 40]);
  const { cities } = useCities();
  const [data, setdata] = useState("");
  const [info, setinfo] = useState("");
  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer 8093hdkdnkukdbjuxi1729202`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-inst-v0-1-32k",
          messages: [
            {
              role: "user",
              content: data,
            },
          ],
          max_tokens: 500,
        }),
      };

      try {
        const response = await fetch(
          "https://chat.tune.app/api/chat/completions",
          options
        );
        const data = await response.json();
        console.log(data);

        setinfo(data.choices[0].message);
      } catch (err) {
        console.error(err);
      }
    }
    async function diffrentLLm() {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY3}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma-7b-it",
          messages: [
            {
              role: "user",
              content: `${req.body.message}  `,
            },
          ],
          max_tokens: 500,
        }),
      };
      try {
        const response = await fetch(
          "https://chat.tune.app/api/chat/completions",
          options
        );
        const data = await response.json();
        res.send(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
    diffrentLLm();
  }, [data]);
  const {
    isLoading: isLoadpos,
    position: geopos,
    getPosition,
  } = useGeolocation();
  useEffect(
    function () {
      if (lat && lng) setposition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geopos) setposition([geopos.lat, geopos.lng]);
    },
    [geopos]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadpos ? "isLoading..." : "Use your position"}
      </Button>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
            onClick={() => {
              setdata(city.cityName);
            }}
          >
            <Popup>
              <h2>{city.cityName}</h2>
              <p>{info}</p>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <Detectclick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function Detectclick() {
  const Navigate = useNavigate();

  useMapEvents({
    click: (e) => Navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;
