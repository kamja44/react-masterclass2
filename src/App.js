import styled, { keyframes } from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;
const animation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;
const Emoji = styled.span`
  font-size: 40px;
`;
const Box = styled.div`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 2s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji} {
    &:hover {
      color: white;
    }
  }
`;
function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>q(≧▽≦q)</Emoji>
      </Box>
    </Wrapper>
  );
}
export default App;
