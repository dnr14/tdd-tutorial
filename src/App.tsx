import { PageHeader } from 'components';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <PageHeader />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default App;
