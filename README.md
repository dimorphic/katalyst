# katalyst
katalyst - web development boilerplate

### Structure

```
katalyst/
	dist/				<- build folder
	  ...
	src/                <- source folder
		app/		    <- app sources (layout + logic)
		  js/
		  scss/
		vendor/         <- bower components
		  ...
		www/			<- main app files
		  assets/       <- app assets (favicons, fonts, images, SVG icons)
		  templates/    <- app templates
		  index.html    <- app main index
		  ...
	task/				<- gulp tasks
	gulpfile.js
	package.json
	config.js           <- app global config (depedencies for app + paths for Katalyst)
```
