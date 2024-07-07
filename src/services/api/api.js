export const fetchOwnersFromApi = async () => {
    const response = await fetch("/api/owners");
    if (!response.ok) {
        throw new Error("Failed to fetch owners");
    }
    return response.json();
};

export const addOwnerToApi = async (owner) => {
    const response = await fetch(`/api/owners/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(owner),
    });
    if (!response.ok) {
        throw new Error("Failed to add new owner");
    }
    return response.json();
};

export const editOwnerInApi = async (owner) => {
    const response = await fetch("/api/owners/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(owner),
    });
    if (!response.ok) {
        throw new Error("Failed to edit owner");
    }
    return response.json();
};

export const deleteOwnerInApi = async (ownerId) => {
    const response = await fetch(`/api/owners/delete/${ownerId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to delete dog");
    }
    return response.json();
};

export const fetchSingleDogFromApi = async (dogId) => {
    const response = await fetch(`/api/dogs/${dogId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch dog");
    }
    return response.json();
};