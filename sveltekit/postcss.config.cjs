module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nesting'),
		require('tailwindcss/nesting')(require('postcss-nesting')),
		require('tailwindcss'),
		require('autoprefixer'),
		require('postcss-preset-env')({
			features: {
				'nesting-rules': false
			}
		}),
		...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : [])
	]
};
