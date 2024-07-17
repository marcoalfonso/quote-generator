/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName: true,
      // Enabled by default.
      ssr: true,
      // Enabled by default.
      fileName: true,
      // Provide at least one path.
      topLevelImportPaths: ["styled-components"],
      // Defaults to ["index"].
      meaninglessFileNames: ["index"],
      // Enabled by default.
      cssProp: true,
      // Provide a non-empty string.
      namespace: "myApp",
      // Not supported yet.
      minify: false,
      // Not supported yet.
      transpileTemplateLiterals: false,
      // Not supported yet.
      pure: false,
    },
  },
};

export default nextConfig;
