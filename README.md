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
- useEffect(,[])의 [] <- 코드를 한번만 실행하기 위해 사용(no dependencies를 의미한다.)
- hooks의 최상의 성능을 위해서 [] 안에 dependency를 넣어야한다(coinId)
- 안에 넣든 말든 결과는 같음

  5.7
  nested router

- router안에 있는 또 다른 router

switch

- 2가지 router를 render할 때 한 번에 하나의 router만 render 할 때 사용

Route

- Route는 path를 반드시 가져야 한다.

  5.8
  Route의 path 입력 시 /아무변수/price 이렇게 입력해도 알아서 경로 찾는다.
  useRouteMatch

- 사용자가 특정한 URL에 있는지의 여부 반환

  5.9
  npm i react-query
  <React Query>

- react query는 데이터를 캐시에 저장한다.
  useQuery <- 2개의 argument필요

- useQuery(queryKey, fetchFunction)
- queryKey = query의 고유식별자

useQuery hook 동작과정

1. fetchFunction을 이용하여 fetch함수 호출
2. fetch함수가 loading중이라면 react query가 로딩중임을 알려준다. <- isLoading
3. 로딩이 끝나면 fetch함수의 결과를 data 매개변수에 담는다.

5.10
React Query Devtools 사용법(설정법)
index.tsx 파일에
import { ReactQueryDevtools } from "react-query/devtools";
<ReactQueryDevtools initialIsOpen={true} />

- 각각의 React Query는 고유한 ID(unique key)를 가지고 있어야 한다.

isLoading: infoLoading

- isLoading변수를 infoLoading이라는 이름으로 부르겠다.

  5.11
  install APEX CHART
  JS CHART LIBRARY
  npm i --save react-apexcharts apexcharts
