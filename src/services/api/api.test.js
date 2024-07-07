import {
    fetchOwnersFromApi,
    addOwnerToApi,
    editOwnerInApi,
    deleteOwnerInApi,
    fetchSingleDogFromApi,
} from './api';
import { newOwner } from '../../test/mocks/mockValues';

describe('API Functions', () => {

    it('fetchOwnersFromApi handles successful response', async () => {
        const response = await fetchOwnersFromApi();
        expect(response.owners).toHaveLength(3);
    });

    it('fetchSingleOwnerFromApi successful', async () => {
        const response = await fetchOwnersFromApi();
        const dogIdToFind = response.dogs[0].id;
        const retrievedDog = await fetchSingleDogFromApi(dogIdToFind);
        expect(retrievedDog.dog.id).toEqual(dogIdToFind)
    });

    it('editOwnerInApi handles successful edit', async () => {
        const prevData = await fetchOwnersFromApi();
        const ownerToEdit = prevData.owners[0];
        const previousOwnerName = ownerToEdit.name;
        const updatedData = await editOwnerInApi({ owner: { ...ownerToEdit, name: "McDonald" } });
        const updatedOwnerName = updatedData.owners[0].name;
        expect(previousOwnerName).not.toEqual(updatedOwnerName);
    });

    it('addOwnerToApi adds new owner successfully', async () => {
        const updatedDataWithNewOwner = await addOwnerToApi(newOwner);
        expect(updatedDataWithNewOwner.owners).toHaveLength(4);
    });

    it('deleteOwnerInApi successful', async () => {
        const prevData = await fetchOwnersFromApi();
        expect(prevData.owners).toHaveLength(3)
        const ownerToDeleteId = prevData.owners[0].id;
        const updatedData = await deleteOwnerInApi(ownerToDeleteId);
        expect(updatedData.owners).toHaveLength(2);
    });
});

