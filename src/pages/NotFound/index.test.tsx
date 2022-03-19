import { screen, render } from '@testing-library/react';
import 'jest-styled-components';
import { NotFound } from '.';

describe('<NotFound>', () => {
  it('<NotFound> 컴포넌트 랜더링', () => {
    const { container } = render(<NotFound />);

    const text = screen.getByText('Not Found');
    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
