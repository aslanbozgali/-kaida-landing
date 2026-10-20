import nextConfig from "eslint-config-next";

// finance-tracker/ — отдельный проект со своей сборкой
const eslintConfig = [...nextConfig, { ignores: ["finance-tracker/**"] }];

export default eslintConfig;
