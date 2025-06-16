import { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import { searchRecipes } from './services/recipeService';
import { Recipe } from './types/Recipe';
import AdvancedSearch from './components/AdvancedSearch';
import './styles/App.css';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


const App = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [offset, setOffset] = useState(0);
    const [number, setNumber] = useState(0);
    const [advancedSearchValues, setAdvancedSearchValues] = useState({});

    const handleSubmitSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await searchRecipes(query, advancedSearchValues);
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
                    <Input
                        type="text"
                        placeholder="Search recipes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
                <Button className="defaultButton" onClick={handleSubmitSearch}>Search</Button>
                {/* Display Advanced Search */}
                <AdvancedSearch
                    advancedSearchValues={advancedSearchValues}
                    setAdvancedSearchValues={setAdvancedSearchValues}
                />
                {/* Display Search Results */}
                {totalResults > 0 ?
                    <>
                        <h2 className="recipe-results">Results: {totalResults} recipes found</h2><p className="recipe-index">Showing {number} recipes starting from offset {offset}</p>
                        <div className="recipes">
                            {recipes?.map((item, index) => (
                                <RecipeCard key={index} recipe={item} />
                            ))}
                        </div>
                    </>
                    : null}
            </div>
        </div>
    );
};

export default App;