#

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
