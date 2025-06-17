import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
    recipe: Recipe;
    onClick?: () => void; // Add the optional onClick prop
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
    return (
        <div className="recipe-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            {/* Add other recipe details */}
        </div>
    );
};

export default RecipeCard;