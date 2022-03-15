import styled from 'styled-components';

export const Button: ButtonFC = ({ label, backgroundColor = '#304ffe', hoverColor = '#1e40ff', onClick }) => {
  return (
    <Container
      data-testid="button-container"
      onClick={onClick}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}>
      <Label>{label}</Label>
    </Container>
  );
};
const Container = styled.div<Omit<Props.Button, 'label'>>`
  text-align: center;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  &:active {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
const Label = styled.div`
  color: #fff;
`;
