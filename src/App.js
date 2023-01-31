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
const Box = styled.div`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 2s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 40px;
    color: white;
  }
`;
function App() {
  return (
    <Wrapper>
      <Box>
        <span>q(≧▽≦q)</span>
      </Box>
    </Wrapper>
  );
}
export default App;
