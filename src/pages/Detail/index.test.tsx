import { screen, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Detail } from '.';
import { _TODO_KEY } from 'utils/localStorageUtils';
import { createMemoryHistory } from 'history';
import { Route, Router, useLocation } from 'react-router-dom';

const _setLocalStorage = () => {
  localStorage.setItem(_TODO_KEY, JSON.stringify(['todo1', 'todo2']));
};

const TestCompo = () => {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
};

const HIS = ({ path = '/detail/1' }: { path?: string }) => {
  const history = createMemoryHistory();
  history.push(`${path}`);

  return (
    <Router history={history}>
      <TestCompo />
      <Route path={'/detail/:id'}>
        <Detail />
      </Route>
    </Router>
  );
};

beforeAll(() => {
  _setLocalStorage();
});

afterAll(() => {
  localStorage.clear();
});

describe('<Detail>', () => {
  it('<Detail> 컴포넌트 랜더링 확인', () => {
    const { container } = render(<HIS />);

    const todoItem2 = screen.getByText('todo2');
    expect(todoItem2).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('redirect to Not Found page if todo id is wrong', () => {
    render(<HIS path="/detail/99" />);
    const url = screen.getByText('/404');
    expect(url).toBeInTheDocument();
  });

  it('delete a ToDo and redirect to the List page', () => {
    render(<HIS />);

    const url = screen.getByText('/detail/1');
    expect(url).toBeInTheDocument();

    const button = screen.getByText('삭제');
    fireEvent.click(button);

    expect(JSON.parse(localStorage.getItem(_TODO_KEY) as string)).not.toContain('todo2');
    expect(url.textContent).toBe('/');
  });
});
