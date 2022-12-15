const path = require("path");

module.exports = {
  title: "Vue Reactions",
  description: "Simple reactions component for Vue 3",
  base: "/vue-reactions/",
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
          text: "Demo",
          collapsible: true,
          items: [
            { text: "Single reaction", link: "/guide/demo/single-reaction" },
            { text: "Single reaction with dropdown", link: "/guide/demo/single-reaction-with-dropdown" },
            { text: "Multiple reactions", link: "/guide/demo/multiple-reactions" },
          ],
        },
        {
          text: "Props",
          collapsible: true,
          items: [
            { text: "Reactions", link: "/guide/props/reactions" },
            { text: "Model value", link: "/guide/props/model-value" },
            { text: "Storage", link: "/guide/props/storage" },
            { text: "Multiple", link: "/guide/props/multiple" },
            { text: "Has dropdown", link: "/guide/props/has-dropdown" },
          ],
        },
        {
          text: "Events",
          collapsible: true,
          items: [
            { text: "update:storage", link: "/guide/events/update-storage" },
            { text: "update:modelValue", link: "/guide/events/update-model-value" },
          ],
        },
      ],
    },
  },
};
