import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { _TODO_KEY } from 'utils/localStorageUtils';
import { FC } from 'react';

beforeAll(() => {
  const todoList = ['todo1', 'todo2', 'todo3'];
  const strTodoList = JSON.stringify(todoList);
  localStorage.setItem(_TODO_KEY, strTodoList);
});

afterAll(() => {
  localStorage.clear();
});

interface Props {
  path?: string;
}

const AppTestCompo: FC<Props> = ({ path = '/' }) => {
  const history = createMemoryHistory();
  history.push(path);
  return (
    <Router history={history}>
      <App />
    </Router>
  );
};

describe('<App>', () => {
  it('renders learn react link', () => {
    render(<AppTestCompo />);
    const pageHeaderText = screen.getByText('할 일 목록');
    expect(pageHeaderText).toBeInTheDocument();

    const item1 = screen.getByText('todo1');
    const item2 = screen.getByText('todo2');
    const item3 = screen.getByText('todo3');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();

    expect(item1.getAttribute('href')).toBe('/detail/0');
    expect(item2.getAttribute('href')).toBe('/detail/1');
    expect(item3.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('삭제')).toHaveLength(3);

    const label = screen.getByText('+');
    expect(label).toBeInTheDocument();
  });

  it('목록 리스트에서 아이템 선택 후 삭제', () => {
    render(<AppTestCompo />);
    const toDoItem = screen.getByText('todo2');
    expect(toDoItem).toBeInTheDocument();

    const todoItem2_Button = screen.getAllByText('삭제')[1];
    expect(todoItem2_Button).toBeInTheDocument();

    fireEvent.click(todoItem2_Button);

    expect(toDoItem).not.toBeInTheDocument();
    const todoList = JSON.parse(localStorage.getItem(_TODO_KEY) as string);
    expect(todoList).toHaveLength(2);
    expect(todoList).not.toContain('todo2');
  });

  it('등록 페이지로 이동 후 리스트페이지로 돌아온다.', () => {
    render(<AppTestCompo />);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();
    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe('할 일 목록');
    expect(addButton.textContent).toBe('+');
  });

  it('등록 페이지 이동 후 새로운 아이템 생성', () => {
    render(<AppTestCompo />);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'todo4' } });
    fireEvent.click(button);

    expect(screen.getByText('할 일 목록')).toBeInTheDocument();
    expect(screen.getByText('todo4')).toBeInTheDocument();

    const str_Todo_List = localStorage.getItem(_TODO_KEY) as string;
    const todoList = JSON.parse(str_Todo_List);

    expect(todoList).toContain('todo4');
    expect(todoList).toHaveLength(3);
  });

  it('디테일 페이지 이동 후 리스트 페이지로 돌아온다.', () => {
    render(<AppTestCompo />);

    const item1 = screen.getAllByText(/todo*/gi)[0];
    expect(item1).toBeInTheDocument();
    expect(item1.getAttribute('href')).toBe('/detail/0');

    fireEvent.click(item1);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();

    const item1Detail = screen.getByText('todo1');
    expect(item1Detail).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();

    fireEvent.click(goBack);

    expect(header.textContent).toBe('할 일 목록');
  });

  it('디테일 페이지에서 아이템 삭제하면 리스트 페이지로 돌아온다', () => {
    render(<AppTestCompo />);

    const todoItem = screen.getByText('todo1');

    expect(todoItem).toBeInTheDocument();
    expect(todoItem.getAttribute('href')).toBe('/detail/0');

    fireEvent.click(todoItem);

    expect(screen.getByText('할 일 상세')).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(screen.getByText('할 일 목록')).toBeInTheDocument();
    const str_todo_List = localStorage.getItem(_TODO_KEY) as string;
    const todoList = JSON.parse(str_todo_List);

    expect(todoList).toHaveLength(2);
    expect(todoList).not.toContain('todo1');
    expect(todoItem).not.toBeInTheDocument();
  });

  it('잘못된 경로 입력 시 404 페이지로 이동한다. 다시 리스트 페이지로 돌아온다.', () => {
    render(<AppTestCompo path="/notfound" />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('에러')).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);
    expect(screen.getByText('할 일 목록')).toBeInTheDocument();
  });
});
