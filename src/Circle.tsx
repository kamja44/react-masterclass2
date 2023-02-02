import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}
const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  border: 10px solid ${(props) => props.borderColor};
`;
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [value, setValue] = useState<number | string>(0);
  setValue(2);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "white"}>
      {text}
    </Container>
  );
}
export default Circle;
