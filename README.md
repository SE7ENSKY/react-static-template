# React Static Template

**Features**
```
 1. Webpack 4
 2. Redux
 3. Code Splitting
 4. Hot Reloading (even on IE)
 5. Babel/ECMAScript 6+
 6. ESLint
 7. nodemon
 8. express
 9. stylus/nib
10. autoprefixer
11. Jest
12. CSS MQPacker
13. react-router-redux
14. yarn
15. Modernizr
16. Service Worker (offline-plugin, HTTPS protocol needed)
17. Async Routing (react-loadable)
18. SASS
19. Webpack Visualizer
20. BannerPlugin
```

**Requirements**

```
node: ^8.11.1
npm: ^5.6.0
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
│   ├── browsers.list.js
│   ├── cssnano.base.config.js
│   ├── cssnano.minify.config.js
│   ├── csstransform.config.js
│   ├── filetransform.config.js
│   ├── jest.config.js
│   ├── modernizr.config.js
│   ├── perfectionist.config.js
│   ├── postcss.config.js
│   ├── postcss.loader.config.js
│   ├── project.root.js
│   ├── server.port.js
│   ├── styles.postprocessor.config.js
│   ├── stylus.loader.config.js
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   ├── webpack.dev.server.config.js
│   ├── webpack.prod.config.js
│   └── webpack.stats.js
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
│   │   ├── functions.styl
│   │   ├── helpers.styl
│   │   ├── main.styl
│   │   ├── mixins.styl
│   │   ├── typo.styl
│   │   └── variables.styl
│   ├── utils
│   ├── index.html
│   └── main.js
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .modernizrrc
├── package.json
└── README.md
```

**Responsive components**
Nowadays web apps mostly are adaptive, and main tool is css media queries. But React ecosystem offers more flexibility and some other way to adapt your content. Let's render components only when we need them, how about appropriate window size.
We use `react-responsive` to supply this concept. Just use one of responsive components.
```javascript
// import our default responsive components, all breakpoints you can configure in 'store/contants.js'
import {
	Desktop, // minWidth = 1000px
	Tablet, // minWidth = 768px and maxWidth = 999px
	Mobile // maxWidth = 767px
} from 'components/Responsive';

const ResponsiveText = () => (
	<div>
		<Desktop>Desktop</Desktop>
		<Tablet>Tablet</Tablet>
		<Mobile>Mobile</Mobile>
	</div>
);
```
