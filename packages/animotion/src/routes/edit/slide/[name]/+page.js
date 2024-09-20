export async function load({ params }) {
    const { name } = params;
    return {
        name,
    }
}