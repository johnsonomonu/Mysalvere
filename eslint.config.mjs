import js from "@eslint/js"

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "scripts/**",
      "*.config.mjs",
      "vitest.config.ts",
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx",
    ],
  },
  js.configs.recommended,
]
