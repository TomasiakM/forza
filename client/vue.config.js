const path = require("path");

module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/scss/variables.scss"; @import "@/assets/scss/global.scss";`,
			},
		},
	},
	outputDir: path.resolve(__dirname, "../public"),
	devServer: {
		proxy: {
			"^/api": {
				target: "http://localhost:3001",
			},
		},
	},
};
