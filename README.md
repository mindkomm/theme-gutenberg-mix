# How to use Gutenberg with Laravel Mix

If you’re looking for a setup where you don’t have to write your own Webpack config to get started with developing for Gutenberg, you may find [Laravel Mix](https://laravel-mix.com/) very useful. This repository shows you a minimum setup that you need to get started.

The different parts are explained here.

## package.json

In **package.json** you can find a basic setup. You can either run `npm install` to install the required dependencies or [add Laravel Mix](https://laravel-mix.com/docs/4.1/installation) to your existing project by running `npm install --save-dev laravel-mix`. Additional required dependencies like `@babel/preset-react` will be installed automatically when you run mix for the first time.

To use Laravel Mix, you also need to add the following scripts to your **package.json**:

```json
"scripts": {
    "dev": "NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "hot": "NODE_ENV=development webpack-dev-server --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "production": "NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
}
```

These are commands that you can use to run Mix.

## assets/editor.js

In here, you can add your hooks to change Gutenberg functionality. You can also use React code in here. Laravel Mix will handle how it will be transpiled.

## webpack.mix.js

The **webpack.mix.js** defines what happens when you run Laravel Mix. The most interesting part is the following:

```js
mix
  // Build editor scripts.
  .react('assets/editor.js', 'build')
```

Here, you say that you want to compile the file **assets/editor.js** that contains React code to **build/editor.js**.

While developing, you can use `npm run watch` to watch for changes. When you’re happy, you can run `npm run production` to make a minified production build of your files.

```bash
# To watch for changes.
npm run watch

# To build for dev with source maps.
npm run dev

# To build for production.
npm run production
```

## functions.php

To actually load the **build/editor.js** file, we can use the `enqueue_block_editor_assets` action. We define a couple of dependencies like `wp-blocks` or `wp-editor` to make sure that our scripts are used after the editor is ready.

```php
add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'theme-editor-scripts',
        get_theme_file_uri( 'build/editor.js' ),
        [
            'wp-blocks',
            'wp-components',
            'wp-compose',
            'wp-editor',
            'wp-element',
            'wp-i18n',
        ],
        filemtime( get_theme_file_path( 'build/editor.js' ) ),
        true
    );
} );
```
