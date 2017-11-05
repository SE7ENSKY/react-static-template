# React Static Template
Beta :alien:

**Features**
```
 1. redux-saga
 2. reselect
 3. Redux
 4. Code splitting
 5. Hot Reloading (even on IE)
 6. axios
 7. Babel/ECMAScript 6+
 8. ESLint
 9. nodemon
10. express
11. stylus/nib
12. autoprefixer
13. Jest
14. enzyme
15. CSS MQPacker
16. react-router-redux
17. redux-thunk
18. react-router
19. yarn
20. Modernizr
21. Critical CSS (currently in development)
22. axios
23. immutable
24. react-lazyload
24. service worker (currently in development)
24. react-lazyload
25. Async Routing (currently in development)
26. SASS
27. Webpack Visualizer
```

**Requirements**

```
node: ^7.0.0
npm: ^4.0.0
```

**Install**

```
// yarn
yarn

// npm
npm i
```

**Use**

```
// only for development, server on localhost:3000
// yarn
yarn start

// npm
npm run start
```
```
// only for production, server on localhost:8080, bundle visualizer on bundle-statistics.html
// yarn
yarn prod

// npm
npm run prod
```
```
// only for production, read-only, build
// yarn
yarn build

// npm
npm run build
```
```
// only for production, read-only, uglified build
// yarn
yarn build:min

// npm
npm run build:min
```
```
// only for testing
// yarn
yarn test

// npm
npm run test
```
```
// only for testing, code coverage
// yarn
yarn test:coverage

// npm
npm run test:coverage
```

**Project structure**
```
react-static-template
├── config 
│   ├── csstransform.config.js
│   ├── filetransform.config.js
│   ├── jest.config.js
│   ├── postcss.config.js
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js
├── server
│   └── server.config.js
├── dist
├── src
│   ├── components
│   ├── containers
│   ├── decorators
│   ├── layouts
│   │   └── CoreLayout
│   │       ├── CoreLayout.js
│   │       └── Index.js
│   ├── redux
│   │   ├── middleware
│   │   └── modules
│   ├── routes
│   ├── static
│   │   ├── i
│   │   │   └── favicons
│   │   ├── f
│   │   └── v
│   ├── store
│   │   ├── constants.js
│   │   ├── createStore.js
│   │   └── reducers.js
│   ├── styles
│   │   ├── helpers.styl
│   │   ├── main.styl
│   │   ├── mixins.styl
│   │   ├── typo.styl
│   │   └── variables.styl
│   ├── utils
│   │   ├── buildQueryString.js
│   │   ├── closest.js
│   │   ├── isArrayValid.js
│   │   └── parseJSON.js
│   ├── index.html
│   └── main.js
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .modernizrrc
├── package.json
└── README.md
```
