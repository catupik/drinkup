import { useEffect, useState } from "react";
import "./App.css";
import videodrink from "./videodrink.mp4";
import CoctailComponents from "./CoctailComponents";

function App() {
  const [mySearch, setMySearch] = useState("");
  const [wordSubmitted, setWordSubmitted] = useState();
  const [myCoctail, setMyCoctail] = useState([]);

  useEffect(() => {
    const getCoctail = async () => {
      try{
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${wordSubmitted}`
        );
        if(!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json();

        if(data.drinks === null){
          // console.error('data.drinks is null')
          // setMyCoctail([])
        } else{
          setMyCoctail(data.drinks);
        
        }

      } catch (error){
        console.error("Error fetching cocktail data:", error);
        setMyCoctail([]);
      }   
    };
    getCoctail();
  }, [wordSubmitted]);

  const myCoctailSearch = (e) => {
    setMySearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  };

  return (
    <div className="App">
      <div className="container">
        <video playsInline autoPlay muted loop>
          <source src={videodrink} type="video/mp4" />
        </video>
        <h1>Drink up!</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
          <input
            className="container"
            onChange={myCoctailSearch}
            value={mySearch}
          ></input>
        </form>
      </div>

      <div className="container">
        <button onClick={finalSearch}
        >find your coctail</button>
      </div>

    <div className="coctails">
    {myCoctail.map((element, index) =>{
      
      const ingredients = Array.from({length:15},(_, i)=> element[`strIngredient${i + 1}`]).filter(Boolean);

      return(
      
      <CoctailComponents key={index}
        name={element.strDrink}
        image={element.strDrinkThumb}
        instructions={element.strInstructions}
        ingredients={ingredients}
      />
    );})}
      </div>
    </div>
  );
}

export default App;
