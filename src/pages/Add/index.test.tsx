import { screen, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Router, useLocation } from 'react-router-dom';
import { Add } from '.';
import { createMemoryHistory } from 'history';
import { _TODO_KEY } from 'utils/localStorageUtils';

const PLACE_HOLDER = '할 일을 입력해주세요.';

beforeEach(() => {
  localStorage.clear();
});

const TestCompo = () => {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
};

const HOC = ({ path = '/' }: { path?: string }) => {
  const history = createMemoryHistory();
  history.push(path);
  return (
    <Router history={history}>
      <Add />
      <TestCompo />
    </Router>
  );
};

describe('<Add>', () => {
  it('Add 컴포넌트 랜더링', () => {
    const { container } = render(<HOC />);
    const placeholder = screen.getByPlaceholderText(PLACE_HOLDER);
    expect(placeholder).toBeInTheDocument();

    const addButton = screen.getByText('추가');
    expect(addButton).toBeInTheDocument();

    fireEvent.change(placeholder, { target: { value: 'todo1' } });
    fireEvent.click(addButton);
    expect(localStorage.getItem(_TODO_KEY)).toBe('["todo1"]');

    expect(container).toMatchSnapshot();
  });

  it('Add 페이지 이동 후 할 일 추가 후 홈으로 돌아간다.', () => {
    render(<HOC path="/add" />);

    const url = screen.getByText('/add');
    expect(url).toBeInTheDocument();

    const placeholder = screen.getByPlaceholderText(PLACE_HOLDER);
    expect(placeholder).toBeInTheDocument();
    fireEvent.change(placeholder, { target: { value: 'todo1' } });
    fireEvent.click(screen.getByText('추가'));
    expect(url.textContent).toBe('/');
  });

  it('인풋태그에 값이 없으면 아이템이 추가되면 안된다.', () => {
    render(<HOC path="/add" />);

    const url = screen.getByText('/add');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('추가');
    fireEvent.click(addButton);

    expect(localStorage.getItem(_TODO_KEY)).toBe(null);
    expect(url.textContent).toBe('/add');
  });
});
