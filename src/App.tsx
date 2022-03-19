import { PageHeader } from 'components';
import { Add, Detail, List, NotFound } from 'pages';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <PageHeader />
      <Switch>
        <Route exact path={'/'}>
          <List />
        </Route>
        <Route path={'/add'}>
          <Add />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
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
