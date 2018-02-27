# React Static Template

**Features**
```
 1. Redux
 2. Code Splitting
 3. Hot Reloading (even on IE)
 4. Babel/ECMAScript 6+
 5. ESLint
 6. nodemon
 7. express
 8. stylus/nib
 9. autoprefixer
10. Jest
11. CSS MQPacker
12. react-router-redux
13. yarn
14. Modernizr (modernizr-loader)
15. Service Worker (offline-plugin, HTTPS protocol needed)
16. Async Routing (react-loadable)
17. SASS
18. happypack
19. Webpack Visualizer
```

**Requirements**

```
node: ^8.0.0
npm: ^5.0.0
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
├── configs 
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
│   ├── configurations
│   ├── containers
│   ├── layouts
│   │   └── CoreLayout
│   │       ├── CoreLayout.js
│   │       └── Index.js
│   ├── reducers
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
