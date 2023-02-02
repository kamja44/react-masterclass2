# TypeScript 이른

1. [TypeScript란](#TypeScript)
2. [TypeScript 설치](#3.1)
3. [React의 propTypes와 TypeScript의 차이점](#propTypes와-TypeScript의-차이점)
4. [TypeScript로 component의 prop에 접근할 수 있는 방법](#component의-prop에-접근할-수-있는-방법)
5. [TypeScript의 interface](#TypeScript의-interface)
   5-1. [interface 요약](#interface-요약)
6. [interface 생성 시 props를 required가 아닌 optional로 설정하기](#3.3)
7. [useState의 타입 설정](#3.4)
8. [Typescript를 사용할 땐 any 타입을 최대한 배제해야한다.](#3.5)
9. [테마 생성 및 사용자 선언 파일 만들기](#3.6)
10. [리엑트 이벤트 DOCS](#리엑트-이벤트-DOCS)

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

#### component의 prop에 접근할 수 있는 방법

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

# 3.5

- onChange의 event는 any 타입이다.
  - Typescript를 사용할 땐 any 타입을 최대한 배제해야한다.
  ```Typescript
  // onChange 이벤트가 Form의 InputElement에 의해서 실행되는것을 알 수 있다.
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
      console.log(event.currentTarget.value);
      // React를사용할 땐 event의 target이 아닌 event의 currentTarget을 사용한다.
    };
  ```

# 3.6

`테마 생성 및 사용자 선언 파일 만들기`

- 사용자의 선언 파일(decleartion)을 만드는 방법

1. src폴더 안에 styled.d.ts 파일 생성
2. styled.d.ts 파일에 해당 코드를 작성한다.

```Typescript
import 'styled-components';

// and extend them!
declare module 'styled-components'{
    export interface DefaultTheme{

    }
}
```

    - export interface DefaultTheme{}에 사용할 props의 타입을 명시한다.
    - 즉, styled components의 테마 정의를 확장한다.

3. src 폴더 안에 theme.ts 파일 생성
   - theme.ts 파일의 테마는 styled.d.ts 파일의 속성과 동일해야 한다.
4. theme.ts 파일에 해당 코드를 작성한다.

```TypeScript
    import {DefaultTheme} from "styled-components";
    export const lightTheme : DefaultTheme = {
        bgColor : "white",
        textColor : "black",
    };
    export const darkTheme : DefaultTheme = {
        bgColor : "black",
        textColor: "white",
    };
```

5. index.tsx 파일에 ThemeProvider component를 import한다.
   - ThemeProvider는 styled-components로부터 오는 컴포넌트의 일종이다.
     - 어떠한 component를 ThemeProvider 안에 넣게 되면 그 component는 Theme Object에 접근할 수 있다.

```Typescript
    ReactDOM.render(
        <ThemeProvider theme={lightTheme}>
            <App />
        </ ThemeProvider>,
        document.getElementById("root")
    );
```

### React ronter docs

- https://reactjs.org/docs/events.html#touch-events
