import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function GET() {
    let result = await getFrameFileNames();
    const frames = result.map(fileName =>
        fileName.slice(0, -'.svelte'.length)
    );


    async function getFrameFileNames() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const framesDirPath = path.join(__dirname, '../../lib/frames');


        console.log('Frames directory path:', framesDirPath)

        try {
            console.log(`Reading directory at path: ${framesDirPath}`);
            const fileNames = await fs.readdir(framesDirPath);
            // console.log('Files found:', fileNames);
            // Optionally filter the fileNames here if you're looking for specific file types
            const svelteFiles = fileNames.filter(fileName => fileName.endsWith('.svelte'));
            // console.log('Filtered .svelte files:', svelteFiles);

            return svelteFiles;
        } catch (error) {
            console.error('Error reading the frames directory:', error);
            return []; // Return an empty array in case of error
        }
    }
    return new Response(JSON.stringify({ status: 'success', message: 'Frames retrieved', frames }));
}

export async function POST({ request }) {
    const { name } = await request.json();

    if (!name) {
        return new Response(JSON.stringify({ status: 'error', message: 'Name is required' }), { status: 400 });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const framesDirPath = path.join(__dirname, '../../lib/frames');
    const newFilePath = path.join(framesDirPath, `${name}.svelte`);

    const fileContent = `<script>
    import CenteredFull from "./layouts/CenteredFull.svelte";

</script>

<style>
    /* Your styles here */
</style>

<CenteredFull>
    <div class="prose">
    <h1 class="text-primary">${name}</h1>
    <p>Subtitle</p>
    <ul class="text-left">
        <li>List 1</li>
    </ul>
    </div>
</CenteredFull>`;

    try {
        await fs.writeFile(newFilePath, fileContent);
        return new Response(JSON.stringify({ status: 'success', message: 'File created', file: `${name}.svelte` }), { status: 201 });
    } catch (error) {
        console.error('Error creating the file:', error);
        return new Response(JSON.stringify({ status: 'error', message: 'Failed to create file' }), { status: 500 });
    }
}