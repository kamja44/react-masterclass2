# CoinTracker Setting

1. [초기설정](#5.0)

# 5.0

- 초기 설정`[react-router-dom은 @5.3.0버전으로 설치!!!!!!]`

1. react-router-dom과 react-query 설치

- npm i react-router-dom react-query
  - react-router-dom은 application에 URL을 가질 수 있게 한다.

2. src > routes 폴더 생성 후 Coin.tsx, Coins.tsx 파일 생성

```Typescript
// Coin.tsx
function Coin() {
  return <h1>Coin</h1>;
}
export default Coin;
// Coins.tsx
function Coins() {
  return <h1>Coins</h1>;
}
export default Coins;
```

3.  Router.tsx 파일 생성

```Typescript
    import { BrowserRouter, Switch, Route } from "react-router-dom";
    import Coins from "./routes/Coins";
    import Coin from "./routes/Coin";
    function Router(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/:coinId">
                        <Coin />
                    </Route>
                    <Route path="/">
                        <Coins />
                    </Route>
                </Switch>
            </BrowserRotuer>
        )
    }
    export default Router;
```

    - `Typescript가 react-router-dom을 인식하지 못하는 문제 발생`
        - npm i --save-dev @types/react-router-dom
            - Typescript가 이해할 수 있는 버전으로 react-router-dom을 설치한다.

- Switch
  - 한 번에 하나의 Route를 렌더링할 수 있다.

`<Route path="/:coinId">`

- :coinId는 Router에게 URL이 변수값을 갖는다는걸 말해주는 방식이다.
  - URL의 파라미터 부분을 사용하고 싶을 때(URL이 갖는 변수 사용) useParams 훅을 사용한다.

```Typescript
    import {useParams} from "react-router";

    function Coin(){
        const params = useParams();
        console.log(params); // URL의 parameter 확인 가능
        return <h1>Coin</h1>;
    }
    export default Coin;
```

    - Typescript가 URL내에 파라미터를 인식못하는 에러 발생
        - 해결책 1 (타입 직접 명시)
            - `const {coinId} = useParams<{coinId:string}>();`
        - 해결책 2 (interface)
            - `interface Params {coinId : string;}`<br>`const{coinId} = useParams<Params>();`

# 5.1

CSS setup

## createGlobalStyle

- 렌더링 될 때 createGlobalStyle property를 사용한 컴포넌트는 전역 스코프에 스타일을 올리 수 있다.
- createGlobalStyle porperty는 styled-components 패키지에 들어있다.

```Javascript
    import {createGlobalStyle} from "styled-components";
    const GlobalStyle = createGlobalStyle`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans   +Pro:wght@300;400&display=swap');
        font-family: 'Source Sans Pro', sans-serif;
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header, hgroup,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    `
    // GlobalStyle을 렌더링하면, 전체 body는 reset.css를 갖게 된다.
    // 즉, GlobalStyle는 전역 스코프가된다.
```

## 서로 다른 2개의 component 반환하기

`Fragment`

- Fragment는 유렁 컴포넌트이다.

```Javascript
    function App(){
        return(
            // <></>는 Fragment이다.
            <>
                <GlobalStyle />
                <Router />
            </>
        )
    }
```

`[Flat UI Color]색상 코드 웹 사이트`
https://flatuicolors.com/palette/gb

# 5.2

`color: inherit`

- color는 부모에게서 가져온다.(부모의 속성을 따른다.)

`Link Componenet는 렌더 시 HTML의 a태그로 변환된다.`

# 5.3

`max-width: 480px`

- container의 크기를 max-width을 이용하여 제한할 수 있다.

코인 API 불러오기

1. `coin의 interface 설정`

```Typescript
interface CoinInterface{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}
function Coins(){
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    // useState를 사용할 때 typeScript의 interface 명시
}
```

2. `API에서 데이터 fetch`

```Typescript
useEffect(() => {
    (async() => {
      const response = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      setCoins(response.slice(0,100));
    })();
  }, []);
```

- ()() -> 즉시실행함수

### JS 배열 자르기[slice]

```Javascript
const array = [1,2,3,4,5]
array.slice(0,3)
// [1,2,3]
```

# 5.4

Link component를 통해 데이터 보내기

```js
<Link
    to = {{
        pathname : `/${coin.id}`,
        state : {name : coin.name},
    }}
>
```

`react-router-dom 6.0.0 버전 이상에서는 <Link to={} state={} /> 처럼 사용`

### react Router DOM이 보내주는 location object에 접근하기

```js
import {useLocation} form "react-router-dom";
const location = useLocation();
console.log(location);
/*
pathname : "/btc-bitcoin"
state : {name: 'Bitcoin'}
*/
```

`Link component에서 state를 통해 보낸 데이터를 useLocation을 이용하면 state 정보를 받아올 수 있다.`

Home화면을 거치지 않고 coin detail(Coin.tsx)페이지에 접근할 때 에러발생 <- state가 정의되지 않는 오류 발생

- Home화면을 거치지 않아 API를 fetch하지 못했기 때문

#### js ?. operator(Optional Chaining)

```js
<Title>{state?.name || "Loading..."}</Title>
```

`JS의 ?.연산자(optional chaining)는 체인의 각 참조가 유효한지 명시적으로 검증하지 않고, 연결된 객체 체인 내의 속성 값을 읽을 수 있다. 즉, 참조가 누락될 가능서이 있는 경우 연결된 속성으로 접근할 때 사용할 수 있다.`

- API를 fetch해온 데이터를 사용할 때 object.key 보단 object?.key를 사용하자
  - object가 항상 값을 가지고 있지 않기 때문

# 5.6

Object.keys(객체명)

- 객체에 들어있는 key들에 대한 array를 받는다.

Object.keys(객체명).join()

- Array.prototype.join()
  - 배열의 모든 요소를 연결하여 하나의 문자열로 만든다.

Object.values(temp1)

- 객체에 들어있는 key의 value들을 array로 받는다.

Typescript로 변수들의 타입을 지정해줬다면useState()에서 정의한 기본값은 삭제한다.

```js
useState({});
// Typescript로 타입을 지정했다면 위 코드를 아래 코드로 변경
useState<Type>();
```

# 5.7

useEffect를 이용하여 component의 시작에서만 코드를 실행하고 싶은 경우useEffect의 2번째 argument에 []를 사용해야 한다. - useEffect의 2번째 argument([])에 변수를 넣으면 변수가 변경될 때마다 다시 실행된다 - [coinId]일 경우 coinId가 변경될 때마다 useEffect를 재시작한다.

```js
useEffect(() => {}, []);
```

## nested router

- router 안에 있는 또 다른 router
  - 웹 사이트에서 탭을 사용할 때 자주 사용한다.

# 5.8

useRouteMatch - 사용자가 특정한 URL에 있는지의 여부를 알려주게 된다.
useRouteMatch 사용법

```js
const priceMatch = useRouteMatch("/:coinId/price");
```

`priceMatch는 사용자가 /:coinId/price URL에 있는지 확인한다. 사용자가 URL에 있다면 객체를 반환하고 사용자가 URL에 없다면 undefined를 반환한다.`

# 5.9 React Query part 1

React Query 사용법(설정)

1. React Query 다운로드
   npm i react-query
2. 파일 설정

- 아래의 코드를 index.tsx 파일에 설정한다.

```js
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
```

3. API(fetch)와 관련된 기능을 component들과 분리(api.ts 파일 생성)

- fetcher 함수 생성
- `fetcher 함수는 반드시 fetch promise를 return해야한다.`
  api.ts 파일

```js
export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
```

4. react-query를 사용할 곳에서 `useQuery` 훅 사용

- useQuery("arg1","arg2")
  - arg1은 queryKey 즉, query의 고유식별자이다.
  - arg2는 사용할 fetcher 함수이다.
  - useQuery는 isLoading이라고 불리는 boolean 값을 return한다.
    - 즉, 기존에 사용하던 loading useState를 대체할 수 있다.

`useQuery 훅 동작과정`
useQuery훅 예제 코드

```js
const { isLoading, data } = useQuery("allCoins", fetchCoins);
```

1. useQuery 훅이 fetcher함수 fetchCoins를 호출한다.<br>
   &nbsp;&nbsp; 1-1. fetcher 함수가 isLoading(로딩중)이라면 react-query가 isLoading을 통해 값을 반환한다.(true or false)
2. fetcher 함수의 동작이 끝나면 react-query가 isLoading을 통해 값을 반환한다.(true or false)
3. fetcher 함수의동작이 끝나면 호출한 API의 데이터(JSON 데이터)를 data에 반환한다.

- react-query가 반환한 데이터는 캐시에 저장된다.

```js
  const [coins, setCoins] = useState<Icoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      setCoins(response.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  console.log(coins);
  위 코드는 아래의 코드와 동일하게 동작한다.
  const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins);
```

# React Query part 2

react query를 이용하면(useQuery 훅 이용) 화면이 바뀔 때마다 API를 요청하지 않는다.

- react query는 요청한 데이터를 cache에 저장하기 때문
  - 즉, 화면이 바뀔때마다 cache에 있는 데이터를 읽을 수 있다.

react query는 Devtools를 가지고 있다.

- devtools = 개발자도구
- react query의 devtools는 render할 수 있는 component이다.
  - render한 devtools를 import하면 캐시에 있는 query를 볼 수 있다.
  - reactQueryDevtools를 import하면 화면 좌측 하단에 query를 볼 수 있는 버튼이 생성된다.

App.tsx 파일에서 reactQueryDevtools import

```js
import { ReactQueryDevtools } from "react-query/devtools";
return (
  <>
    <ReactQueryDevtools initialIsOpen={true} />
  </>
);
```

매개변수가 있는 fetch

1. api.ts파일에서 fetcher함수 작성

```js
const BASE_URL = `https://api.coinpaprika.com/v1`;
export function fetchCoinInfo(coinId?: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => {
    response.json();
  });
}
export function fetchCoinTickers(coinId?: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => {
    response.json();
  });
}
```

2. Coin.tsx파일에서(react-query를 사용할 곳) useQuery 훅 사용

- useQuery 훅을 사용할 때 첫번째 argument는 고유한 키값을 가져야한다.
  - react query는 useQuery 훅의 첫 번째 argument(고유한 키값)를 보고 query를 인식한다.
- React query는 key를 array로 감싸서 표현한다.
  - Ex) ["allCoins"] (Coins.tsx 파일의 useQuery 훅)
  - 즉, 첫 번째 argument를 고유한 값을 가지고 있는 배열로 설정한다.

```js
const { isLoading: infoLoading, data: infoData } = useQuery(
  ["info", coinId],
  () => fetchCoinInfo(coinId)
);
const { isLoading: tickersLoading, data: tickersData } = useQuery(
  ["tickers", coinId],
  () => fetchCoinTickers(coinId)
);
// isLoading: infoLoading <- useQuery가 반환해주는 isLoading을 infoLoading 이름으로 변경하겠다. 나머지도 마찬가지
//  () => fetchCoinInfo(coinId) <- fetchCoinInfo 함수를 호출할 때 coinId를 매개변수로 전달하기 위해 함수를 호출하여 매개변수 전달
```
