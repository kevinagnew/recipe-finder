import { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import { searchRecipes } from './services/recipeService';
import { Recipe } from './types/Recipe';
import AdvancedSearch from './components/AdvancedSearch';
import './styles/App.css';
import AdvancedSearchToggle from './components/AdvancedSearchToggle';


const App = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [offset, setOffset] = useState(0);
    const [number, setNumber] = useState(0);
    const [checked, setChecked] = useState(false);
    
    const handleSubmitSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        try {
            const data = await searchRecipes(query);
            setTotalResults(data.totalResults);
            setOffset(data.offset);
            setNumber(data.number);
            setRecipes(data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="App">
            <div className='app-content'>
                <h1>Recipe Finder</h1>
                <form onSubmit={handleSubmitSearch}>
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    <AdvancedSearchToggle checked={checked} setChecked={setChecked} />
                </form>
                { checked ? <AdvancedSearch/> : null}
                { totalResults > 0 ?
                <div className="recipes">
                    <h2 className="recipe-results">Results: {totalResults} recipes found</h2>
                    <p className="recipe-index">Showing {number} recipes starting from offset {offset}</p>
                    {recipes?.map((item, index) => (
                        <RecipeCard key={index} recipe={item} />
                    ))}
                </div>
                : null }
            </div>
        </div>
    );
};

export default App;