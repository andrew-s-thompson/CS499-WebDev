import {useState, useEffect} from 'react'

function CafeInspiration() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadRecipes() {
            const response = await fetch("https://dummyjson.com/recipes?limit=4");
            const data = await response.json();
            setRecipes(data.recipes);
            setLoading(false);
        }
        loadRecipes();
    }, [])
    function displayRecipes() {
        return(loading ?
            "Loading Recipe Ideas"
            :
            recipes.map(recipe => <div className="recipe-grid">
                <article className="recipe-card" key={recipe.id}>
                    <h3>{recipe.name}</h3><br />
                    <img src={recipe.image} alt={recipe.name} width="180"/>
                    <p>{recipe.difficulty}</p>
                </article>
            </div>
            ))
    }
    return (
        <section>
            <h2>Cafe Inspiration</h2>
            {displayRecipes()}
        </section>
    )
}

export default CafeInspiration;
