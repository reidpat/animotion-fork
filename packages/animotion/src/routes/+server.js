/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
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
export async function POST({ request }) {
    const { name } = await request.json();

    if (!name) {
        return new Response(JSON.stringify({ status: 'error', message: 'Name is required' }), { status: 400 });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const framesDirPath = path.join(__dirname, '../lib/data/presentations');
    const newFilePath = path.join(framesDirPath, `${name}.json`);

    const fileContent = `{
  "slides": [
    [
      {
        "path": "Test1.svelte"
      }
    ]
  ]
}`;

    try {
        await fs.writeFile(newFilePath, fileContent);
        return new Response(JSON.stringify({ status: 'success', message: 'File created', file: `${name}.svelte` }), { status: 201 });
    } catch (error) {
        console.error('Error creating the file:', error);
        return new Response(JSON.stringify({ status: 'error', message: 'Failed to create file' }), { status: 500 });
    }
}
