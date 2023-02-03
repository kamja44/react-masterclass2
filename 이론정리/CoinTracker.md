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
