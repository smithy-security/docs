import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Smithy Docs",
  tagline: "Documentation for the Smithy Security platform.",
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
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
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

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          petstore: {
            specPath: "openapi/petstore.yaml",
            outputDir: "docs/reference/petstore",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
