const assert = require('assert');
const postcss = require('postcss').default;
const declarations = require('./');

async function test() {
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

	const input = `
.foo {
	@declarations colors;
}
.bar {
	@declarations colors, spacing;
}
`;
	const output = `
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
`;
	const result = await postcss([declarations(groups)]).process(input, {from: 'test.css', to: 'out.css'});

	assert.equal(result.css, output, `Result different than expected`);

	// Test error
	let error;
	try {
		await postcss([declarations(groups)]).process(`@declarations foo`, {from: 'test.css', to: 'out.css'});
	} catch (_error) {
		error = _error;
	}

	assert.equal(error?.reason, 'Unknown declarations group "foo".', `Didn't throw on unknown group`);
}

test();
