import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const PageHeader = () => {
  const { pathname } = useLocation();

  let title = '에러';

  if (pathname === '/') {
    title = '할 일 목록';
  }
  if (pathname === '/add') {
    title = '할 일 추가';
  }
  if (pathname.startsWith('/detail')) {
    title = '할 일 상세';
  }

  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== '/' && <Goback to="/">돌아가기</Goback>}
    </Container>
  );
};

const Goback = styled(Link)``;
const Container = styled.div``;
const Title = styled.div``;
