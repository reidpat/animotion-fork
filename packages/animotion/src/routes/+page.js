import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
    try {
        const response = await fetch('/src/lib/presentations/test.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { presentations: data };
    } catch (e) {
        console.error('There was a problem fetching the data:', e);
        throw error(500, 'There was a problem fetching the data');
    }
}