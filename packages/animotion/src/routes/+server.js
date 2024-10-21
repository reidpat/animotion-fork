/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { json } from '@sveltejs/kit';

export async function GET({request}) {
    let result = await getFrameFileNames();
    const presentations = result.map(fileName =>
        fileName.slice(0, -'.json'.length)
    );


    async function getFrameFileNames() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const framesDirPath = path.join(__dirname, '../lib/data/presentations');


        console.log('Frames directory path:', framesDirPath)

        try {
            console.log(`Reading directory at path: ${framesDirPath}`);
            const fileNames = await fs.readdir(framesDirPath);
            // console.log('Files found:', fileNames);
            // Optionally filter the fileNames here if you're looking for specific file types
            const svelteFiles = fileNames.filter(fileName => fileName.endsWith('.json'));
            // console.log('Filtered .svelte files:', svelteFiles);

            return svelteFiles;
        } catch (error) {
            console.error('Error reading the frames directory:', error);
            return []; // Return an empty array in case of error
        }
    }
    return new Response(JSON.stringify({ status: 'success', message: 'Frames retrieved', presentations }));
}
