import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import DetailModal from './DetailModal';

const thunkMiddleware = require("redux-thunk").thunk
const mockStore = configureMockStore([thunkMiddleware]);
const mockCloseDetailModal = vi.fn();

describe('DetailModal component', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        owner: {
          owners: [
            { id: 1, name: 'John Doe', exp: 3, dogId: 1 },
            { id: 2, name: 'Jane Doe', exp: 5, dogId: 2 }
          ]
        },
        dog: {
            dogs: {
                dog: {},
                owners: []
            }
        }
    });
      store.dispatch = vi.fn();
    });

    it('renders null when no dog data to display', () => {
        render(
            <Provider store={store}>
              <DetailModal isOpen={true} handleCloseDetailModal={mockCloseDetailModal} />
            </Provider>
          );
          expect(screen.getByText("No data to display")).toBeInTheDocument();
    });
})