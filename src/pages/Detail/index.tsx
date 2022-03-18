import { Button } from 'components';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { _TODO_KEY } from 'utils/localStorageUtils';

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const list: string[] = JSON.parse(localStorage.getItem(_TODO_KEY) ?? '[]');
  const todoitem = list[Number(id)];

  const { replace } = useHistory();

  if (todoitem === undefined) {
    replace('/404');
  }

  const _delete = () => {
    list.splice(Number(id), 1);
    const strList = JSON.stringify(list);
    localStorage.setItem(_TODO_KEY, strList);
    replace('/');
  };

  return (
    <Container>
      <ToDo>{todoitem}</ToDo>
      <Button label="삭제" backgroundColor="#FF1744" hoverColor="#F01440" onClick={_delete} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  align-items: center;
  flex-direction: column;
`;
const ToDo = styled.div`
  min-width: 350px;
  height: 350px;
  overflow-y: auto;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
  padding: 10px;
`;
