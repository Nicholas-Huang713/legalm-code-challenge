export const newOwner = {
    dog: {
        name: "Pup",
        food: "bananas",
        img: "imgSrc"
    },
    owner: {
        name: "Sally",
        exp: 4,
    }
};

export const emptyDogDataInStore = ({
    dogs: {
        dog: {},
        owners: [],
    },
})


export const dogDataInStore = ({
    dogs: {
        dog: { id: 1, name: "peanut", food: "pizza", ownerId: "1" },
        owners: [{ id: 1, name: "John Doe", exp: 3, dogId: 1 }],
    }
})


export const ownersList = {
    owners: [
        { id: 1, name: "John Doe", exp: 3, dogId: 1 },
        { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
    ],
};