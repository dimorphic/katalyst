## Katalyst - web development boilerplate

Katalyst is meant to provide a starter 'boilerplate' or 'seed' for building web apps using HTML5, JS and CSS and all modern 'sugars' out there (ES6, SCSS, HAML and more).

The project also aims for an 'universal' boilerplate able to handle and adapt to the unique needs of developers when it comes to setting up your code transformers / pre-processors, project structure, etc.

Katalyst runs on Gulp.JS, so it's 'task' based. Each action/transform you want to make on your file(s), be it: copy, move, delete, transpile (ES6-2-ES5), pre-process (SCSS -> CSS), is viewed as a 'task'.

This point of view regarding each file 'transform' as a task, allows us to have multiple small task modules that handle a specific thing. Thus making it easy for anyone to write his own custom 'transformer' to do his 'bidding' in his awesome custom project.

#### TODO:

- [ ] Kickstart Webpack bundler repo
- [ ] Refactor JS task to use Webpack instead of RequireJS?

