import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

const onClickMock = vi.fn();
const renderButton = () => render(<Button btnText="Hello" handleClick={onClickMock} value="Hello" /> );

describe('Button component', () => {
    it('renders button component', () => {
        renderButton();
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it('onClick method called', () => {
        renderButton();
        const btn = screen.getByText("Hello");
        fireEvent.click(btn);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    })
})