import { createContext,useState,useEffect, useContext } from "react";

const CitiesContext = createContext();

function CitiesProvider({children}){
    const URL = 'http://localhost:9000';
    const[cities,setcities] = useState([]);
    const[isLoading,setisLoading] = useState(false);
    const[currentCity,setCurrentCity] = useState({});
    useEffect(function () {
      async function fetchcities(){
        
        try{
          setisLoading(true);
          const res = await fetch(`${URL}/cities`);
          const data = await res.json();
        setcities(data);
      } catch{
        alert("there was a error fetching data...");
      }
      finally{
        setisLoading(false);
      }
  
  
  
      }
      fetchcities();
  
    }, []);
    async function getCity(id){
        
        try{
            setisLoading(true);
            const res = await fetch(`${URL}/cities/${id}`);
            const data = await res.json();
          setCurrentCity(data);
        } catch{
          alert("there was a error fetching data...");
        }
        finally{
          setisLoading(false);
        }
    

    }
    async function createCity(newCity){
        
      try{
          setisLoading(true);
          const res = await fetch(`${URL}/cities`,{
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
              "Content-Type": "application/json",
            },
            }
          );
          const data = await res.json();
          setcities((cities) => [...cities, data])
      } catch{
        alert("there was a error fetching data...");
      }
      finally{
        setisLoading(false);
      }
  

  }
  async function deleteCity(id){
        
    try{
        setisLoading(true);
         await fetch(`${URL}/cities/${id}`,{
          method: "DELETE",
          }
        );
        setcities((cities) => cities.filter((city) => {
          return city.id !== id
        }))
    } catch{
      alert("there was a error fetching data...");
    }
    finally{
      setisLoading(false);
    }


}



    return <CitiesContext.Provider value={{cities,isLoading,currentCity,getCity,createCity,setcities,deleteCity}}>{children}</CitiesContext.Provider>


}
function useCities(){
    
    const context = useContext(CitiesContext);
    if(context===undefined)
      throw new Error("citiescontent was used outside context provider");
    return context



}
export {CitiesProvider,useCities};