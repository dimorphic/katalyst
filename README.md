## Katalyst - web development boilerplate

Katalyst is meant to provide a starter 'boilerplate' or 'seed' for building web apps using HTML5, JS and CSS and all modern 'sugars' out there (ES6, SCSS, JSX and more).

The project also aims for an 'universal' boilerplate able to handle and adapt to the unique needs of developers when it comes to setting up your code transformers / pre-processors, project structure, etc.

Katalyst runs on Gulp and on Webpack recently (check branch!).

#### The philosophy:
Each action / transform you make on your file(s), be it: copy, move, delete, transpile (ES6-2-ES5), pre-process (SCSS -> CSS), is viewed as a 'task'. Atleast that worked for Gulp, now that we're switching to Webpack, maybe something alongside can be applied.

This point of view regarding each file 'transform' as a task, allows us to have multiple small task modules that handle a specific thing. Thus making it easy for anyone to write his own custom 'transformer' to do his 'bidding' without much fuss.

### Getting started
1. Clone repo
2. Install deps: `$ npm install`
3. Stat dev mode (webpack ready): `$ npm start`
4. Open browser @ `http://localhost:8080`
5. Make awesome stuff!

#### TODO:

- [x] Kickstart Webpack bundler repo
- [x] Refactor JS task to use Webpack instead of RequireJS?
- [ ] Better docs
