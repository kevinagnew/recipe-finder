import { Recipe } from '../types/Recipe';

const SPOONACULAR_API_KEY = import.meta.env.VITE_API_KEY;

export const searchRecipes = async (query: string, advancedSearch, offset): Promise<{
    totalResults: number;
    offset: number;
    number: number;
    results: Recipe[];
}> => {
    let baseUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}`;
    if (advancedSearch?.minCalories) {
        baseUrl += `&minCalories=${advancedSearch.minCalories}`;
    }
    if (advancedSearch?.maxCalories) {
        baseUrl += `&maxCalories=${advancedSearch.maxCalories}`;
    }
    if (advancedSearch?.minCarbs) {
        baseUrl += `&minCarbs=${advancedSearch.minCarbs}`;
    } 
    if (advancedSearch?.maxCarbs) {
        baseUrl += `&maxCarbs=${advancedSearch.maxCarbs}`;
    }
    if (advancedSearch?.cuisine) {
        baseUrl += `&cuisine=${advancedSearch.cuisine}`;
    }
    if (offset) {
        baseUrl += `&offset=${offset}`;
    }

    const res = await fetch(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': SPOONACULAR_API_KEY,
        },
    });

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
        totalResults: data.totalResults,
        offset: data.offset,
        number: data.number,
        results: data.results.map((item: Recipe) => ({
            id: item.id,
            title: item.title,
            image: item.image,
            imageType: item.imageType,
        })),
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRecipeInformation = async (id: number): Promise<any> => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': SPOONACULAR_API_KEY,
        },
    });

    const data = await res.json();
    return {
        id: data.id,
        image: data.image,
        imageType: data.imageType,
        title: data.title,
        readyInMinutes: data.readyInMinutes,
        servings: data.servings,
        sourceUrl: data.sourceUrl,
        vegetarian: data.vegetarian,
        vegan: data.vegan,
        glutenFree: data.glutenFree,
        dairyFree: data.dairyFree,
        veryHealthy: data.veryHealthy,
        cheap: data.cheap,
        veryPopular: data.veryPopular,
        sustainable: data.sustainable,
        lowFodmap: data.lowFodmap,
        weightWatcherSmartPoints: data.weightWatcherSmartPoints,
        gaps: data.gaps,
        preparationMinutes: data.preparationMinutes,
        cookingMinutes: data.cookingMinutes,
        aggregateLikes: data.aggregateLikes,
        healthScore: data.healthScore,
        creditsText: data.creditsText,
        license: data.license,
        sourceName: data.sourceName,
        pricePerServing: data.pricePerServing,
        extendedIngredients: data.extendedIngredients,
        summary: data.summary,
        cuisines: data.cuisines,
        dishTypes: data.dishTypes,
        diets: data.diets,
        occasions: data.occasions,
        instructions: data.instructions,
        analyzedInstructions: data.analyzedInstructions,
        spoonacularScore: data.spoonacularScore,
        spoonacularSourceUrl: data.spoonacularSourceUrl
    };
};