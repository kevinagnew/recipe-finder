/* eslint-disable @typescript-eslint/no-explicit-any */

interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>ID: {recipe.id}</p> {/* Display the recipe ID */}
            {isValidUrl(recipe.image) && (
                <img src={recipe.image} alt={recipe.title} />
            )}
            <p>Image Type: {recipe.imageType}</p> {/* Display the image type */}
        </div>
    );
};

export default RecipeCard;
