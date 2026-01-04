import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import packageJson from '../../packages/kookie-ui/package.json' with { type: 'json' }

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false, // We'll use our own backgrounds
  grid: true, // Enable grid for full-width line highlighting
  defaultLang: 'plaintext',
  defaultColor: false, // Disable default color to force CSS variables
  // Enable inline code highlighting with {:lang} syntax
  // This will work in MDX: `const x = 1{:js}`
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
    ],
    rehypePlugins: [
      rehypeSlug, // Add this - generates IDs for headings
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Transpile the local kookie-ui package
  transpilePackages: ['@kushagradhawan/kookie-ui'],
  // Expose kookie-ui version to the client
  env: {
    KOOKIE_UI_VERSION: packageJson.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withMDX(nextConfig)
