import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';
import 'jest-styled-components';

describe('<Button>', () => {
  it('<Button> 랜더링', () => {
    const { container } = render(<Button label="추가" />);

    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(container).toMatchSnapshot();
  });
  it('<Button> background, hoverColor change Test', () => {
    const backgroundColor = '#304ffe';
    const hoverColor = '#1e40ff';
    render(<Button label="추가" backgroundColor={backgroundColor} hoverColor={hoverColor} />);

    const parent = screen.getByTestId('button-container');
    expect(parent).toHaveStyleRule('background-color', '#304ffe');
    expect(parent).toHaveStyleRule('background-color', '#1e40ff', {
      modifier: ':hover',
    });
    expect(parent).toHaveStyleRule('box-shadow', '5px 5px 10px rgba(0,0,0,0.2)', {
      modifier: ':active',
    });
  });

  it('<Button> click Test', () => {
    const handleClick = jest.fn();
    render(<Button label="추가" onClick={handleClick} />);
    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
