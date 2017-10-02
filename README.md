# gulp boilerplate

a boilerplate for gulp files!

* Markup compilation
* Stylesheet compilation
* Script compilation
* Source linting
* Static server with automatic live reload/style injection

The aim is to get you up and running with something in _gulp_ quickly!

Currently the boilerplate makes use of `pug`, `stylus` and `es6/babel`. But these could easily be swapped out/removed based on your requirements.

The general presumption is that most projects require some form of `markup`, `style` and `script` compilation in addition to watching. This bundled in with some static server capability if required.

The idea is that _you_ will fork your own version and adapt it to fit in with the tech stack you are using and the tasks you need.

There are many alterations you could make.

For example;
* You don't use __pug__, you remove the need for __pug__ by adjusting your markup tasks to simply export markup to a desired destination post linting.
* You need `browserify` so you adjust your compilation task to make use of `browserify` bundling (this scenario is not as straightforward as normal `gulp` tasks and requires a slightly different set up to get the output from `browserify` as a readable stream for use by `gulp`).

## Usage
as a prerequisite it's assumed you have `npm/yarn` installed and the `gulp-cli`.

1. Clone the repo

        git clone https://github.com/jh3y/gulp-boilerplate.git

2. Install dependencies

        npm install / yarn

3. Start gulp

        gulp

4. Start hacking away with super fast livereload goodness.

### babel-polyfill
__NOTE::__ If you require the use of `babel` features that need polyfilling, you'll need to include the `babel-polyfill` script file with your JavaScript files. You could generate an `infrastructure/vendor` js file containing this and include within a `<script>` tag. The `babel-polyfill` is located at `node_modules/babel-polyfill/dist/polyfill.{min.}js`.


## Structure
You could have a `gulpfile` with all your tasks in one file. But, if your task list grows and it starts becoming a case of having to hunt through the file to refactor/make changes, it might be easier to split up your file and refactor your tasks into separate modules.

Tasks live under the `build-tasks` folder in relevant modules. For example, script related functions live within `scripts.js`. Each module exports aptly named functions such as `compile`, `lint` and `watch`. These are invoked from the `gulpfile`. For those that just want everything in one file, refer to `gulpfile.nomodule.js`.

## Tasks
You can see all available tasks with `gulp -T`. This will print out a list of available tasks and their respective metadata.

## License
MIT

---

Any problems or questions, feel free to post an issue or tweet me, @_jh3y!

@jh3y 2017 :smile:
