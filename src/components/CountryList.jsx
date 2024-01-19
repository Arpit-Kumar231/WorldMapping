import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
const CountryList = () => {
  const {cities,isLoading} = useCities();
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message='Add your first country' />
  return (
    <ul className={styles.countryList}>
        {cities.map((city) => (<CountryItem key={city.id} country={city }/>) )}

    </ul>
  )
}

export default CountryList