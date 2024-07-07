import { v4 as uuidv4 } from 'uuid';

export function seeds(server) {
    const ownerData = [
        { id: uuidv4(), name: 'Alice', exp: 10 },
        { id: uuidv4(), name: 'Bob', exp: 5 },
        { id: uuidv4(), name: 'Jerry', exp: 3 },
    ];
    const dogData = [
        {
            id: uuidv4(),
            name: 'Marshmallow',
            food: 'apples',
            img: 'https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg',
        },
        {
            id: uuidv4(),
            name: 'Peanut',
            food: 'peanut butter',
            img: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1220.jpg',
        },
        {
            id: uuidv4(),
            name: 'Biscuit',
            food: 'beef',
            img: 'https://images.dog.ceo/breeds/pyrenees/n02111500_7194.jpg',
        },
    ];
    ownerData.forEach((owner, index) => {
        const createdOwner = server.create('owner', owner);
        server.create('dog', { ...dogData[index], owner: createdOwner });
    });
}
