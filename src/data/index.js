import rawData from './projects.json';

const SAFE_DEFAULTS = {
    id: 'unknown-project',
    title: 'Untitled Project',
    year: '2024',
    imageUrl: '/assets/placeholder.webp', // Need to ensure this exists or use a generic one
    link: '#'
};

export function getProjects() {
    return rawData.map(item => {
        // Runtime Schema Validation
        if (!item.id || !item.title) {
            console.warn(`Project missing required fields:`, item);
        }

        return {
            ...SAFE_DEFAULTS,
            ...item,
        };
    });
}
