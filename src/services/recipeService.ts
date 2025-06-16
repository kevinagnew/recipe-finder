import { Recipe } from '../types/Recipe';

const SPOONACULAR_API_KEY = import.meta.env.VITE_API_KEY;

export const searchRecipes = async (query: string, advancedSearch): Promise<{
    totalResults: number;
    offset: number;
    number: number;
    results: Recipe[];
}> => {
    // console.log("KA - query", query);
    // console.log("KA - advancedSearch", advancedSearch);
    // const testURL = 'https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=25&number=2';
    //const testURL2 = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
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
    console.log("KA - baseUrl", baseUrl);

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