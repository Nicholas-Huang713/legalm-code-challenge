export const fetchOwnersFromApi = async () => {
    const response = await fetch('/api/owners');
    if (!response.ok) {
        throw new Error('Failed to fetch owners');
    }
    return response.json();
};

export const fetchSingleDogFromApi = async (dogId) => {
    const response = await fetch(`/api/dogs/${dogId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch dogs');
    }
    return response.json();
};

// export const fetchDogsFromApi = async () => {
//     const response = await fetch('/api/dogs');
//     if (!response.ok) {
//         throw new Error('Failed to fetch dogs');
//     }
//     return response.json();
// };