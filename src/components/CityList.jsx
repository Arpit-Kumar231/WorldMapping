import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
import Button from './Button'
const CityList = () => {
  const {cities,isLoading,setcities} = useCities();
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message='Add your first city' />
  return (
    <>
    <ul className={styles.cityList}>
        {cities.map((city) => (<CityItem key={city.id} city={city }/>) )}

    </ul>
    <Button type="primary" onClick={() => setcities([])}>clear</Button>
    </>
    
  )
}

export default CityList