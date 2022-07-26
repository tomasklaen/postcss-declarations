# postcss-declarations

PostCSS plugin that adds `@declarations` at rule which will be replaced with declarations defined in JS.

#### Use case

I'm personally using this to generate CSS variables for themes in JS and inject them into CSS. Since there's a lot of them, and they use `lch()`, doing it inside postcss/sass is incredibly slow (up to 4 seconds), which is just insane. With `@declarations` I get an order of magnitude speedup in generating CSS files.

You could of course also mold postcss-mixins to do the same thing, it'd just be a bit less comfy, and a bit slower. The reason I don't is that my source files are in SASS which already has a `@mixin` at rule.

## Install

```
npm install postcss-declarations --save-dev
```

## Usage

```js
const declarations = require('postcss-declarations');

const groups = {
	colors: {
		'--foo': 'white',
		color: 'var(--foo)',
		background: 'black',
	},
	spacing: {
		margin: '1em',
		padding: '1em',
	},
};

const postcssConfig = {
	plugins: [declarations(groups)],
};
```

## Example

Input:

```css
.foo {
	@declarations colors;
}
.bar {
	@declarations colors, spacing;
}
```

Output

```css
.foo {
	--foo: white;
	color: var(--foo);
	background: black;
}
.bar {
	--foo: white;
	color: var(--foo);
	background: black;
	margin: 1em;
	padding: 1em;
}
```
