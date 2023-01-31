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
