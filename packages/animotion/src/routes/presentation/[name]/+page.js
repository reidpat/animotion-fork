import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const { name } = params;
    
    try {
        const module = await import(`$lib/presentations/${name}.json`);
        return {
            presentation: module.default
        };
    } catch (e) {
        throw error(404, `Presentation "${name}" not found`);
    }
}