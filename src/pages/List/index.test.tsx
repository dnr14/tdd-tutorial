import { screen, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { List } from './index';
import { createMemoryHistory } from 'history';
import { Router, useLocation } from 'react-router-dom';
const _todo_key = 'todo_list';

beforeEach(() => {
  localStorage.clear();
  const _list = ['todo1', 'todo2', 'todo3'];
  localStorage.setItem(_todo_key, JSON.stringify(_list));
});

const TestComponent = () => {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
};

const HOC = ({ path = '/' }: { path?: string }) => {
  const history = createMemoryHistory();

  history.push(path);
  return (
    <Router history={history}>
      <TestComponent />
      <List></List>
    </Router>
  );
};

describe('<List>', () => {
  it('<List> 랜더링 확인', () => {
    const history = createMemoryHistory();
    history.push('/');

    const { container } = render(<HOC></HOC>);

    const item1 = screen.getByText('todo1');
    const item2 = screen.getByText('todo2');
    const item3 = screen.getByText('todo3');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('삭제');
    expect(deleteButtons).toHaveLength(3);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    expect(addButton.getAttribute('href')).toBe('/add');
    expect(container).toMatchSnapshot();
  });

  it('Delete Button Test', () => {
    render(<HOC></HOC>);

    const item1 = screen.getByText('todo1');
    expect(item1).toBeInTheDocument();

    const deleteButton = screen.getAllByText('삭제')[0];

    fireEvent.click(deleteButton);

    expect(item1).not.toBeInTheDocument();

    expect(JSON.parse(localStorage.getItem(_todo_key) as string)).toHaveLength(2);
    expect(JSON.parse(localStorage.getItem(_todo_key) as string)).not.toContain('todo1');
  });

  it('moves detail page', () => {
    render(<HOC></HOC>);

    const item1 = screen.getByText('todo1');
    expect(item1).toBeInTheDocument();
    expect(item1.getAttribute('href')).toBe('/detail/0');

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();
    fireEvent.click(item1);
    expect(url.textContent).toBe('/detail/0');
  });

  it('move to add page', () => {
    render(<HOC></HOC>);

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(url.textContent).toBe('/add');
  });
});
