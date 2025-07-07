import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Daniel Liu",
    pageTitleSuffix: "- Daniel's Vault",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "cloudyleopard.github.io/public-vault",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lato",
        body: "Calibri",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light:        "#f0fff4",
          lightgray:    "#d9f2e6",
          gray:         "#a8d5b7",
          darkgray:     "#4e4e4e",
          dark:         "#2b2b2b",
          secondary:    "#284b63",
          tertiary:     "#84a59d",
          highlight:    "rgba(143, 159, 169, 0.15)",
          textHighlight:"#fff23688"
        },
        darkMode: {
          light:        "#0d190d",
          lightgray:    "#1b361b",
          gray:         "#3e5c3e",
          darkgray:     "#d4d4d4",
          dark:         "#ebebec",
          secondary:    "#7b97aa",
          tertiary:     "#84a59d",
          highlight:    "rgba(143, 159, 169, 0.15)",
          textHighlight:"#b3aa0288"
        }
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
