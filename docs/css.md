# Styling components

We use [css-modules](https://github.com/css-modules/css-modules). Each component has a `styles.scss` file next to it's `index.js` file. 

Any css values (e.g. colors) that are applied to multiple different components should belong in the `globals.scss` stylesheet in the root of the project as a scss variable. Then import the `globals.scss` file into your local `styles.scss` file which will give you access to those variables.

