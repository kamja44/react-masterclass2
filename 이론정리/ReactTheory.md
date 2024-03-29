# [React 이론]

1. [styled-component](#styled-component설치)
2. [props](#props)
3. [컴포넌트 상속](#컴포넌트-상속)
4. [컴포넌트의 태그를 바꾸고 싶은데 스타일은 바꾸고 싶지 않을 때](#컴포넌트의-태그를-바꾸고-싶은데-스타일은-바꾸고-싶지-않을-때)
5. [styled component 안에서 animation 추가](#styled-component-안에서-animation-추가)
6. [component안의 element 선택하기](#component안의-element-선택하기)

# 2.1

## styled-component설치

- npm i styled-components

#### styled-component를 사용하면 자동으로 class명을 생성한다. 생성한 class명에 css 코드를 저장한다.

#### styled-component 사용법

```
const Box = styled.div`
  background-color: teal;
`
function App(){
  return(
    <Box />
  )
}
```

- styled.div에서 div대신 HTML tag사용이 가능하다.
- style component안(백틱 안(``안))에는 CSS코드가 들어간다.

# 2.2

## props

- 컴포넌트에 데이터를 보내는 방법

#### props 사용법

##### App

```
return(
  <Father>
    <Box bgcolor="teal">
    <Box bgcolor="tomato">
  </Father>
)
```

- <Box>에서 보내준 props들을 컴포넌트(const Box)에서 받아줘야한다.
- background-color: ${props => props.bgColor};

##### Box

```
  const Box = styled.div`
  background-color: ${props => props.bgColor};
  width:100px;
  height:100px;
  `
```

- return에 있는 props(bgColor)와 컴포넌트에서 사용할 props(${props => props.bgColor}})의 이름이 같아야 한다.

#### 컴포넌트 상속

```
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width:100px;
  height:100px;
  `
const Circle = styled(Box)`
  border-radius: 50px;
`
```

- styled(Box)의 의미란 Box의 모든 속성들을 들고 온 다음 추가적으로 백틱(``)안의 내용을 추가한다.

# 2.3

## 컴포넌트의 태그를 바꾸고 싶은데 스타일은 바꾸고 싶지 않을 때

```
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;
  return (
    <Father>
      <Btn>Log In</Btn>
      <Btn as="a" href="#">Log In</Btn>
    </Father>
  );
```

- 스타일은 유지하며 컴포넌트의 태그를 바꾸고 싶을 때 컴포넌트에 as= "바꾸고 싶은 태그"를 추가하여 태그를 변경한다.

* 컴포넌트에서 HTML의 속성 추가가 가능하다.

#### styled components가 컴포넌트를 생성할 때, 속성값을 설정할 수 있다.

```
const Input = styled.input.attrs({required: true})`
  background-color: tomato;
`
return(
  <Input />
  <Input />
  <Input />
  <Input />
  <Input />
)
```

- styled.input.attrs({})를 사용하면 모든 Input 컴포넌트를 생성할 때 required: true 속성을 추가한다.

# 2.4

## styled component 안에서 animation 추가

```
import {keyframes} from "styled-components";
const animation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;
const Box styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
`
```

- animation은 styled-components의 {keyframes}를 import하여 사용할 수 있다.
  - component의 animation: ${animation} 1s linear infinite는 const animation = keyframes을 1초동안 linear로 무한대로 반복하겠다는 뜻이다.

#### component안의 element 선택하기

```
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    font-size: 36px;
    &:hover{
      color:white;
    }
  }
`;
<Box>
    <span>q(≧▽≦q)</span>
</Box>
```

- Box styled-component안에 span을 작성하여 Box 컴포넌트 안의 span element를 선택할 수 있다.
  - span 안의 &연산자는 자기자신을 가르킨다. 즉, &:hover{}는 span:hover{}와 같다.

# 2.5

```
const Emoji = styled.span`
  font-size: 40px;
`;
const Box = styled.div`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  background-color: tomato;
  ${Emoji}{
    &:hover{
      color:white;
    }
  }
`
return (
  <Box>
    <Emoji>q(≧▽≦q)</Emoji>
  </Box>
)
```

### 2.4절에서는 compoenet안에서 element를 선택하여 element가 변경될 경우 componenet안의 element도 수정했어야 했는데 Emoji 컴포넌트를 생성하여 Box 컴포넌트 안에서 Emoji 컴포넌트를 선택하여 element를 변경할 경우 component만 변경하면 되도록 설정

- 이 방식은 styled component에서만 가능하다.

# 2.7

Theme

### index.js

```
import {ThemeProvider} from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor:"#111",
}
const lightTheme={
  textColor: "#111",
  backgroundColor:"whitesmoke",
}

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
)
```

### App.js

```
  const Title = styled.h1`
    color: ${props => props.theme.textColor}
  `;
  const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  height:100vh;
  align-items:center;
  `;
  function App(){
    return(
      <Wrapper>
        <Title>Title</Title>
      </Wrapper>
    )
  }
```

- App component는 ThemeProvider 안에 있기 때문에 App 컴포넌트 안에 있는 컴포넌트들은 ThemeProvider의 theme color에 접근할 수 있다.
  - App component의 Title component는 theme의 textColor or backgroundColor에 접근할 수 있다.
  - 접근방법은 다음과 같다.
    - `color: ${props => props.theme.textColor};`
- App component의 Wrapper도 theme color에 접근할 수 있다.
  - App component의 Wrapper component는 theme의 textColor or backgroundColor에 접근할 수 있다.
  - 접근방법은 다음과 같다.
    - `background-color:${props => props.theme.backgroundColor};`

`즉 ,ThemeProvider에 둘러쌓인 모든 compoenet들은 theme에 접근할 수 있다.`
