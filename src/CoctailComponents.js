function CoctailComponents({ name, image, instructions, ingredients }) {
  return (
    <div className="bord">
      <div className="container">
        <h2>{name}</h2>
      </div>

      <div className="container">
        <img src={image} alt="coctail" width="200" />
      </div>
      <div>
        <ul>
            {ingredients.map((element, index)=>(
                <li key={index}>{element}</li>
            ))}
        </ul>
        
      </div>

      <div className="container description">
        <h4>{instructions}</h4>
      </div>
    </div>
  );
}

export default CoctailComponents;
