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
                {/* Search Input */}
                <h2>Recipe Finder</h2>
                <form className="search-recipe-field" onSubmit={handleSubmitSearch}>
                    <Input
                        type="text"
                        placeholder="Search recipes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
                <Button className="defaultButton" onClick={handleSubmitSearch}>Search</Button>
                {/* Advanced Search */}
                <AdvancedSearch
                    advancedSearchValues={advancedSearchValues}
                    setAdvancedSearchValues={setAdvancedSearchValues}
                />
                {/* Recipe Search Results */}
                {totalResults > 0 ?
                    <>
                        <h2 className="recipe-results">Results: {totalResults} recipes found</h2>
                        <div className='recipe-results-container'>
                            <div className="recipes">
                                {recipes?.map((item, index) => (
                                    <RecipeCard key={index} recipe={item} />
                                ))}
                            </div>
                        </div>
                        <p className="recipe-index">Showing {number} recipes starting from offset {offset}</p>
                        {/* TODO: Add pagination for results */}
                    </>
                    : null
                }
            </div>
        </div>
    );
};

export default App;