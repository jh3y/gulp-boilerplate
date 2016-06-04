# gulp boilerplate

a boilerplate for gulp files!

* Markup compilation
* Stylesheet compilation
* Script compilation
* Source linting
* Static server with automatic live reload/style injection

The aim is to get you up and running with something in _gulp_ quickly!

Currently the boilerplate makes use of `jade`, `stylus` and `es6/babel`. But these could easily be swapped out/removed based on your requirements.

The general presumption is that most projects require some form of `markup`, `style` and `script` compilation in addition to watching. This bundled in with some static server capability if required.

The ideal is that _you_ will fork your own version and adapt it to fit in with the tech stack you are using and the tasks you need.

There are many alterations you could make.

For example;
* You don't use __jade__, you remove the need for __jade__ by adjusting your markup tasks to simply export markup to a desired destination post linting.
* You need `browserify` so you adjust your compilation task to make use of `browserify` bundling (this scenario is not as straightforward as normal `gulp` tasks and requires a slightly different set up to get the output from `browserify` as a readable stream to be used by `gulp`).

## Usage
as a prerequisite it's assumed you have `npm` installed and the `gulp-cli`.

1. clone the repo

        git clone https://github.com/jh3y/gulp-boilerplate.git

2. install dependencies

        npm install

3. start gulp

        gulp

4. start hacking away with super fast livereload goodness.

### babel-polyfill
__NOTE::__ If you require the use of `babel` features need polyfilling, you'll need to include the `babel-polyfill` script file with your JavaScript files. You could generate an `infrastructure/vendor` js file containing this and include within a `<script>` tag. The `babel-polyfill` is located at `node_modules/babel-polyfill/dist/polyfill.{min.}js`.


## Structure
You could have a `gulpfile` with all your tasks in one file. But, if your task list grows and it starts becoming a case of having to hunt through the file to refactor/make changes, it might be easier to split up your file and refactor your tasks into separate modules.

Tasks live under the `build-tasks` folder in relevant modules. For example, script related functions live within `scripts.js`. Each module exports aptly named functions such as `compile`, `lint` and `watch`. These are invoked from the `gulpfile`. For those that just want everything in one file, refer to `gulpfile.nomodule.js`.

## Tasks
* `serve`: Set up instance of `browsersync` watching `build` directory w/ live reload/reinjection enabled for rapid static site development.
* `watch`: Watches all declared source files for changes and triggers compilation.
* `compile`: Compiles sources.
* `deploy`: Deploys build output to `gh-pages` branch on repo.
* `scripts:lint`: Lints source script files.
* `scripts:compile`: Compiles source script files.
* `scripts:watch`: Watches source script files for changes and triggers compilation.
* `styles:lint`: Lints source script files.
* `styles:compile`: Compiles source script files.
* `styles:watch`: Watches source script files for changes and triggers compilation.
* `markup:lint`: Lints source script files.
* `markup:compile`: Compiles source script files.
* `markup:watch`: Watches source script files for changes and triggers compilation.

## License
MIT

===
Any problems or questions, feel free to post an issue or tweet me, @_jh3y!

@jh3y 2016 :smile:
