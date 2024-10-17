import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const { name } = params;
    
    try {
        // Use the slug to determine which file to fetch
        const response = await fetch(`/src/lib/data/presentations/${name}.json`);
        
        if (!response.ok) {
            throw error(404, 'Presentation not found');
        }
        
        const data = await response.json();
        return { 
            name,
            presentation: data 
        };
    } catch (e) {
        console.error('There was a problem fetching the data:', e);
        throw error(500, 'There was a problem fetching the data');
    }
}