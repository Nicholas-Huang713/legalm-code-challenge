export const dogImgUrls = [
    "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_1941.jpg",
    "https://images.dog.ceo/breeds/papillon/n02086910_6293.jpg",
    "https://images.dog.ceo/breeds/stbernard/n02109525_11747.jpg",
    "https://images.dog.ceo/breeds/mexicanhairless/n02113978_1069.jpg",
];
export const dogFoods = ["apples", "peanuts", "fish", "cheese", "carrots"];
export const dogNames = ["Cooper", "Charlie", "Daisy", "Happy", "Dash"];

export const getRandomDog = () => {
    return {
        img: getRandomElement(dogImgUrls),
        name: getRandomElement(dogNames),
        food: getRandomElement(dogFoods),
    };
};

const getRandomElement = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};
