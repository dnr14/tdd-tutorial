import { Button } from 'components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const _todo_key = 'todo_list';

export const List = () => {
  const [todoList, setTodoList] = useState<string[]>([]);

  useEffect(() => {
    const list = localStorage.getItem(_todo_key);
    if (list) setTodoList(JSON.parse(list));
  }, []);

  const _onDelete = (idx: number) => () => {
    todoList.splice(idx, 1);
    setTodoList([...todoList]);
    const strList = JSON.stringify(todoList);
    localStorage.setItem(_todo_key, strList);
  };

  return (
    <Container>
      <ToDoList>
        {todoList.map((text, idx) => (
          <ToDoItem key={text}>
            <Label to={`/detail/${idx}`}>{text}</Label>
            <Button label="삭제" backgroundColor="#ff1744" hoverColor="#f01440" onClick={_onDelete(idx)} />
          </ToDoItem>
        ))}
      </ToDoList>
      <AddButton to={'/add'}>+</AddButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  align-items: center;
`;

const ToDoItem = styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = styled(Link)`
  flex: 1;
  margin-right: 20px;
  text-decoration: none;
`;

const ToDoList = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;
const AddButton = styled(Link)`
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
  background-color: #404ffe;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  &:hover {
    background-color: #1e40ff;
  }

  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
