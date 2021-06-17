# 리액트 + CKEditor5 커스텀

### 1. 리액트 생성

- npx create-react-app '생성할 리액트 폴더이름'

### 2. webpack.config.js 파일 생성

- yarn eject

### 3. 의존성 install

- webpack configuration 수정전, 필요한 의존성을 install

```
yarn add \
    raw-loader@3 \
    @ckeditor/ckeditor5-dev-utils \
    @ckeditor/ckeditor5-theme-lark \
    @ckeditor/ckeditor5-react \
    @ckeditor/ckeditor5-editor-classic \
    @ckeditor/ckeditor5-essentials \
    @ckeditor/ckeditor5-paragraph \
    @ckeditor/ckeditor5-basic-styles
```

### 4. webpack.config.js 수정

- PostCSS 구성을 위한 객체를 가져온다.

    const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

- CKEditor5를 조작하기위한 SVG, CSS 로더를 설정 (module.rules 배열 내부에 추가)

```
{
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    use: [ 'raw-loader' ]
},
{
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    use: [
        {
            loader: 'style-loader',
            options: {
                injectType: 'singletonStyleTag',
                attributes: {
                    'data-cke': true
                }
            }
        },
        {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig( {
                themeImporter: {
                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                },
                minify: true
            } )
        }
    ]
},
```

### 5. CSS 로더에서 CKEditor5에서 사용하는 CSS제외 설정

- test: cssRegex로 시작하는 loader를 찾아서 아래 코드로 수정한다.
- 중복으로 빌드되는 ckeditor5의 theme css를 제외하기 위해 or로 변경

```
{
    test: cssRegex,
    exclude: {
			or: [cssModuleRegex, /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/],
		},
    // (...)
}
```

- test: cssModuleRegex로 시작하는 다른 loader를 찾아서 아래 코드를 추가한다.

```
{
    test: cssModuleRegex,
    exclude: [
        /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    ],
    // (...)
}
```

### 6. file-loader에서 SVG, CSS 파일을 제외 설정

```
{
    loader: require.resolve( 'file-loader' ),
    // Exclude `js` files to keep the "css" loader working as it injects
    // its runtime that would otherwise be processed through the "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpack's internal loaders.
    exclude: [
        /\.(js|mjs|jsx|ts|tsx)$/,
        /\.html$/,
        /\.json$/,
        /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/],
    options: {
        name: 'static/media/[name].[hash:8].[ext]',
    }
}
```

### 7. 웹팩 플러그인 설치

- yarn add @ckeditor/ckeditor5-dev-webpack-plugin --dev
- webpack.config.js에 아래코드 추가

    const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );

### 8. 필요한 Plug-In 설치 및 사용

- npm install --save @ckeditor/ckeditor5-font
- npm install --save @ckeditor/ckeditor5-link
- npm install --save @ckeditor/ckeditor5-basic-styles
- npm install --save @ckeditor/ckeditor5-block-quote
- npm install --save @ckeditor/ckeditor5-alignment
- npm install --save @ckeditor/ckeditor5-table
- npm install --save @ckeditor/ckeditor5-list
- npm install --save @ckeditor/ckeditor5-image
- npm install --save @ckeditor/ckeditor5-horizontal-line
- npm install --save @ckeditor/ckeditor5-undo
- npm install --save @ckeditor/ckeditor5-ui
- npm install --save @ckeditor/ckeditor5-heading
- npm install --save @ckeditor/ckeditor5-indent
- npm install --save @ckeditor/ckeditor5-media-embed

### [참고]
- 리액트 + CKEditor5 생성

[React component - CKEditor 5 Documentation](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html)

- 플러그인 정보

[API documentation - CKEditor 5 API docs](https://ckeditor.com/docs/ckeditor5/latest/api/index.html)

- 참고한 블로그

[CKEditor5 React webpack setup](https://nopsled.tistory.com/246)

[react ckeditor5 기억하기](https://velog.io/@kyungjune/react-ckeditor5-%EA%B8%B0%EC%96%B5%ED%95%98%EA%B8%B0)