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

# 3.0

## TypeScript

- strongly-typed 언어
  - 프로그래밍 언어가 작동하기 전에 type을 확인한다.

```Typescript
  const plus = (a:number,b:number) => a+b;
```

- a와 b에 number가 아니 다른형이 들어가면 에러발생
- 코드에 에러가 있다면, 프로그램이 작동하기 전에 TypeScript가 에러를 알려준다.

# 3.1

- TypeScript 설치

1. 방법 1

- npx create-react-app 내 앱 이름 --template typescript
  - create-react-app을 이용하여 새로운 react app 생성

2. 방법 2

- npm i --save typescript @types/node @types/react @types/react-dom @types/jest

`타입스크립트 파일의 확장자명은 ts이다.`
`타입스크립트를 사용하는 react파일의 확장자면은 tsx이다.`

어떤 라이브러리나 패키지는 TypeScript로 만들어진게 아니다.

- 즉, typeScript로 만들어진 패키지로 설치해야한다.
- npm i --save-dev @types/styled-components
  - styled-components를 typescript 형식으로 정의한 라이브러리 설치
  - 유명한 라이브러리들은 @types에 정의되어있다.

### propTypes와 TypeScript의 차이점

propTepes는 prop이 있는지 없는지 확인해주지만, `코드를 실행한 후`에만 확인할 수 있다.
TypeScript는 `코드가 실행되기 전`에 오류를 확인할 수 있다.

#### component의 prop에 접ㄱㄴ할 수 있는 방법

Circle.tsx

```TypeScript
const Container = styled.div``;
function Circle({bgColor}){
  return <Container />;
}
export default Circle
```

App.tsx

```TypeScript
  function App(){
    return(
      <div>
      <Circle bgColor="teal" />
      <Circle bgColor="coral" />
      </div>
    )
  }
```

#### TypeScript의 interface

- object의 모양을 TypeScript에게 설명한다.
  - 즉, interface는 object를 설명해준다.

```TypeScript
interface ContainerProps{
  bgColor: string;
}
interface CircleProps{
  bgColor: string;
}
/*
 생성한 interface(CircleProps)의 타입이 뭔지 component({bgcolor})에게 말해줘야 한다.
 function Circle({bgcolor}: CircleProps){}
 즉, bgColor의 타입은 CircleProps의 object라는걸 명시한다.
 */
/*
  <Container />는 div태그이다. 하지만, Container component는 어떤 props도 받고 있지 않다.
  즉, TypeScript에게 bgColor를 styled-component에게도 보내고 싶다고 말해야한다. <- 새로운 interface인 ContainerProps를 생성하여 전달한다.


  이 경우 ContainerProps와 Circleprops는 둘다 하나의 prop(bgColor)을 보낸다는 점에서 같다.
  생성한 ContainerProps interface를 Container component에 아래와 같이 추가한다.
  const Container = styled.div<ContainerProps>``;
*/
// 즉, styled.div<ContainerProps>``;이 코드는 TypeScript에게 Container가 bgColor(ContainerProps interface)를 받을거라고 명시하는 코드이다.
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor}
`;
function Circle({bgColor}: CircleProps){
  return <Container bgColor={bgColor}/>;
}
```

## interface 요약

```Typescript
interface PlayerShape{
  name:string;
  age:number;
}
const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`

sayHello({name:"kamja", age:"age"}) // age가 string이기 때문에 에러 발생
sayHello({name:"kamja", age:12,hello:1}) // hello는 PlayerShape에 정의되어 있지 않기에 에러 발생
```

- `interface는 TypeScript와 코드가 실행되기 전에 확인한다.`
- `Prop Types는 코드 실행 후 브라우저에 에러로 표시된다.`

- 코드 1 [ContainerProps와 CircleProps를 통합]

```TypeScript
  interface CircleProps {
    bgColor: string;
  }
  const Container = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%;
  `;
function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
```

- 코드 2 [ContainerProps와 CircleProps를 분리]

```TypeScript
interface ContainerProps {
  bgColor: string;
}
interface CircleProps {
  bgColor: string;
}
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
`;
function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
```

- 코드1과 코드2는 동일하다.

# 3.3

interface 생성 시 props를 required가 아닌 optional로 설정하기

```Typescript
  interface CircleProps{
    bgColor: string; // required [component에 bgColor가 없으면 에러 발생]
    borderColor ?: string; // optional [component에 borderColor가 없어도 에러 발생 x]
    /*
    borderColor ?: string 코드는 아래 코드와 동일하다.
    borderColor : string | undefined;
    */
  }
```

- 값이 NULL이거나 undefined일 경우 기본값 설정
  - JS ?? 연산자
    - 왼쪽 피연산자가 NULL이거나 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리연산자이다.

```Typescript
  interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text ?: string;
  }
  function Circle({bgColor, borderColor, text="default text"} : CircleProps){
    return (<Container bgColor = {bgColor} borderColor={borderColor ?? "white"}>{text}</Container>);
    // borderColor가 Null 혹은 undefined면 white를 사용한다.
    // text를 props로 받지 못했다면 default text를 사용한다.
  }
```

# 3.4

## useState의 타입 설정

```Typescript
  function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [value, setValue] = useState<number | string>(0);
  // useState<number | string>으로 설정하면 value는 number 타입 or string 타입을 원한다는걸 알 수 있다.
  // useState에 default value [useState(0)]을 설정해도 Typescript가 타입 추측이 가능하다.
  setValue(2)
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "white"}>
      {text}
    </Container>
  );
}
```
