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
