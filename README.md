styled.d.ts <- index.d.ts 파일을 확장하기 위해 사용
즉, index.d.ts file 덮어쓰기한다.

userParams <- URL에서 정보를 얻어올 수 있다.

createGlobalStyle(App.tsx)

- styled-components 안에 있다.
- 하나의 컴포넌트를 생성하는데 생성한 컴포넌트는 전역 스코프에 스타일을 올려준다.

Fragment(App.tsx line12)

- 유령 컴포넌트
- 부모 태그 없이 서로 붙어 있는 것들을 리턴한다.
- 즉, <GlobalStyle></GlobalStyle><Router></Router>만 return 된다.

flatuicolors.com

- 배경 색 파레트

Theme 관련 파일

- styled.d.ts <- theme 모듈 설정
- theme.ts <- 색 설정

  5.3

interface

- typeScript에게 data의 type 설명

useEffect

- component의 시작과 끝 등 특정한 상황에서만 function 실행
- 즉, component가 생성될 때 한번만 코드 실행

()()

- 즉시 실행 함수
  (() => console.log(1))() <- console.log(1)바로 실행

[].slice(0,100)

- 배열을 0부터 100까지 자르기

  5.4
  Link의 to로 데이터 보내기

- state 안에 object 형태로 데이터 보낼 수 있음
- 보낸 데이터를 useLocation()함수를 이용하여 받을 수 있음

  Link 클릭 시 페이지 이동 안되는 오류

- index.tsx 페이지의 <React.StrictMode></React.StrictMode>제거

  5.5

- capsulation(캡슐화)
- useEffect(,[])의 [] <- useEffect 생성 시 empty array 생성을 의미한다.
