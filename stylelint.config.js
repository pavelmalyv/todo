/** @type {import('stylelint').Config} */

export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
	rules: {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
	},
};
