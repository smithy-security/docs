import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Smithy Docs",
  tagline: "Focus on the important stuff.",
  favicon: "img/favicon.png",

  url: "https://docs.smithy.security",
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "ocurity",
  projectName: "docs",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ocurity/docs/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.png",
    navbar: {
      title: "Docs",
      logo: {
        alt: "Smithy Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          position: "left",
          label: "Tutorials",
          to: "/docs/category/tutorials",
        },
        {
          position: "left",
          label: "How-Tos",
          to: "/docs/category/how-tos",
        },
        {
          position: "left",
          label: "Explanation",
          to: "/docs/category/explanation",
        },
        {
          position: "left",
          label: "Reference",
          to: "/docs/category/reference",
        },
        {
          href: "https://github.com/ocurity/docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorials",
              to: "/docs/category/tutorials",
            },
            {
              label: "How-Tos",
              to: "/docs/category/how-tos",
            },
            {
              label: "Explanation",
              to: "/docs/category/explanation",
            },
            {
              label: "Reference",
              to: "/docs/category/reference",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/smithy",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/ocurity/docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SPF Security Solutions Ltd. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "docker", "makefile"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
