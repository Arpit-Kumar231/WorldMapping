import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import {MapContainer , TileLayer , Marker , Popup, useMap, useMapEvents} from 'react-leaflet'
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';


const Map = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [position,setposition] = useState([0,40]);
  const {cities} = useCities();
  const {isLoading : isLoadpos , position : geopos , getPosition} = useGeolocation();
  useEffect(function(){
    if(lat && lng) setposition([lat,lng])
  },[lat,lng]);
  useEffect(function(){
    if(geopos) setposition([geopos.lat,geopos.lng])

  }, [geopos])

  return (
    <div className={styles.mapContainer} >
      <Button type='position' onClick={getPosition}>{isLoadpos ? 'isLoading...' : 'Use your position'}</Button>
    <MapContainer center={position} zoom={6} scrollWheelZoom={true} className={styles.map}>
     <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
     />
    {cities.map((city) => (<Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker> ))}
    <ChangeCenter position={position}/>
    <Detectclick />
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null

}
function Detectclick(){
  const Navigate = useNavigate();

  useMapEvents({
    click: (e) => Navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
  return null
}

export default Map