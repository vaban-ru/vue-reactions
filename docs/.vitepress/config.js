const path = require("path");

module.exports = {
  title: "Vue Reactions",
  description: "Simple reactions component for Vue 3",
  // base: "/vue-reactions/",
  vite: {
    plugins: [],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../../src"),
      },
      dedupe: ["vue"], // avoid error when using dependencies that also use Vue
    },
  },
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          text: "Get started",
          items: [{ text: "Install & Use", link: "/guide/install" }],
        },
        {
          text: "Props",
          collapsible: true,
          items: [
            { text: "Reactions", link: "/guide/props/reactions" },
            { text: "ModelValue", link: "/guide/props/model-value" },
          ],
        },
      ],
    },
  },
};
