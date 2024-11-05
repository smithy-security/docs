import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Smithy Docs",
  tagline: "Learn how to use Smithy",
  favicon: "img/favicon.png",

  url: "https://docs.smithy.security",
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "smithy-security",
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
          editUrl: "https://github.com/smithy-security/docs/tree/main/",
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
          label: "Quickstart",
          to: "/docs/oss/quickstart",
        },
        {
          position: "left",
          label: "Open-Source",
          to: "/docs/category/oss",
        },
        {
          position: "left",
          label: "SaaS",
          to: "/docs/category/saas",
        },
        {
          position: "left",
          label: "Components",
          to: "/docs/reference/components/all",
        },
        {
          position: "left",
          label: "Reference",
          to: "/docs/reference",
        },
        {
          href: "https://github.com/smithy-security/docs",
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
              label: "Quickstart",
              to: "/docs/oss/quickstart",
            },
            {
              label: "Open-Source",
              to: "/docs/category/oss",
            },
            {
              label: "SaaS",
              to: "/docs/category/saas",
            },
            {
              label: "Components",
              to: "/docs/reference/components/all",
            },
            {
              label: "Reference",
              to: "/docs/reference",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/zDUQRhtxhn",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/smithy-security/docs",
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

  plugins: [],
};

export default config;
