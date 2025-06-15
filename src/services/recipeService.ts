import { Recipe } from '../types/Recipe';

const SPOONACULAR_API_KEY = import.meta.env.VITE_API_KEY;

export const searchRecipes = async (query: string): Promise<{
    totalResults: number;
    offset: number;
    number: number;
    results: Recipe[];
}> => {
    // const testURL = 'https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=25&number=2';
    //const testURL2 = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    //const testURL = `https://api.spoonacular.com/recipes/complexSearch?query=${query}`;
    
    const baseUrl = `https://api.spoonacular.com/recipes/search?query=${query}`;

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