import { Button } from 'components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { _TODO_KEY } from 'utils/localStorageUtils';

export const Add = () => {
  const [todo, setTodo] = useState('');

  const { replace } = useHistory();

  const _addTodo = () => {
    if (todo === '') return;
    const _list = JSON.parse(localStorage.getItem(_TODO_KEY) ?? '[]');

    localStorage.setItem(_TODO_KEY, JSON.stringify([..._list, todo]));
    replace('/');
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="할 일을 입력해주세요."
        onChange={({ target: { value } }) => {
          setTodo(value);
        }}
      />
      <Button label="추가" onClick={_addTodo} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;
