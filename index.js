const {Declaration} = require('postcss');

/**
 * @param {Record<string, Record<string,string>>} groups
 */
module.exports = (groups) => {
	if (!groups || typeof groups !== 'object') {
		throw new Error(`postcss-declarations requires 1st parameter to be an object with declaration groups.`);
	}

	return {
		postcssPlugin: 'postcss-declarations',
		AtRule: {
			declarations: (atRule) => {
				const groupNames = atRule.params.split(',').map((raw) => raw.trim());
				const declarations = [];

				for (const groupName of groupNames) {
					const group = groups[groupName];
					if (!group) throw atRule.error(`Unknown declarations group "${groupName}".`);

					for (const [prop, value] of Object.entries(group)) {
						declarations.push(new Declaration({prop, value}));
					}
				}

				atRule.replaceWith(declarations);
			},
		},
	};
};

module.exports.postcss = true;
