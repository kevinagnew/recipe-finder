import { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import { searchRecipes, getRecipeInformation } from './services/recipeService';
import { Recipe } from './types/Recipe';
import AdvancedSearch from './components/AdvancedSearch';
import './styles/App.css';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { IconButton } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';


const App = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [offset, setOffset] = useState(0);
    const [advancedSearchValues, setAdvancedSearchValues] = useState({});
    const [isRecipeSelected, setIsRecipeSelected] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSubmitSearch = async (e: React.FormEvent, offset?) => {
        e.preventDefault();
        try {
            const standardOffset = offset || 0;
            const data = await searchRecipes(query, advancedSearchValues, standardOffset);
            setTotalResults(data.totalResults);
            setOffset(data.offset);
            setRecipes(data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleRecipeClick = async (recipe: Recipe) => {
        const isRecipeOpened = isRecipeSelected ? true : !isRecipeSelected;
        setIsRecipeSelected(isRecipeOpened);
        const recipeData = await getRecipeInformation(recipe.id);
        setSelectedRecipe(recipeData);
    }

    const handlePagiationClick = async (direction: number) => {
        const newOffset = offset + direction;
        setOffset(newOffset);
        handleSubmitSearch({ preventDefault: () => {} } as React.FormEvent, newOffset);
    }

    return (
        <div className="App">
            <div className='app-content'>
                {/* Search Panel */}
                <div className='search-container'>
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
                </div>
                {/* Recipe Search Results */}
                {totalResults > 0 ?
                    <>
                        <div className='recipe-results-content'>
                            <h2 className="recipe-results">Results: {totalResults} recipes found</h2>
                            <div className='recipe-results-container'>
                                <div className="recipes">
                                    {recipes?.map((item, index) => (
                                        <RecipeCard 
                                            key={index} 
                                            recipe={item} 
                                            onClick={() => handleRecipeClick(item)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='pagination-container'>
                                <div className='pagination-buttons'>
                                    <IconButton
                                        size="sm"
                                        disabled={offset === 0}
                                        onClick={() => {
                                            handlePagiationClick(-1);
                                        }}
                                    >
                                        <NavigateBeforeOutlinedIcon/>
                                    </IconButton>
                                    <p>{offset}</p>
                                    <IconButton
                                        size="sm"
                                        onClick={() => {
                                            handlePagiationClick(1);
                                        }}
                                    >
                                        <NavigateNextOutlinedIcon/>
                                    </IconButton>
                                </div>
                            </div>
                            {/* TODO: Add pagination for results */}
                        </div>
                    </>
                    : 
                    <>
                        <div className='recipe-results-content'>
                            <div className='no-results'>
                                No results found for your search, configure filters or try a different recipe.
                            </div>
                        </div>
                    </>
                }
                {/* Recipe Information */}
                { isRecipeSelected ? 
                <div className="recipe-container">
                    <div>Recipe Information</div>
                    <IconButton
                        size="sm"
                        onClick={() => {
                            setIsRecipeSelected(false);
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <div className="recipe-details">
                        <h3>{selectedRecipe?.title}</h3>
                        <img src={selectedRecipe?.image} alt={selectedRecipe?.title} />
                        <p>Ready in: {selectedRecipe?.readyInMinutes} minutes</p>
                        <p>Servings: {selectedRecipe?.servings}</p>
                        <p>Ingredients:</p>
                        <ul>
                            {selectedRecipe?.extendedIngredients?.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                        <p>Instructions: </p>
                        <div dangerouslySetInnerHTML={{ __html: selectedRecipe?.instructions || '' }} />
                    </div>
                </div>
                : null }
            </div>
        </div>
    );
};

export default App;