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
