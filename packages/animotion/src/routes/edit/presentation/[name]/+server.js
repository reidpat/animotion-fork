import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';


export async function PATCH({ request, params }) {
    const { name } = params;
    const filePath = path.resolve('src/lib/data/presentations', `${name}.json`);

    try {
        const updatedData = await request.json();
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        return json({ success: true });
    } catch (err) {
        console.error('Failed to update the JSON file:', err);
        return new Response('Failed to update the file', { status: 500 });
    }
}