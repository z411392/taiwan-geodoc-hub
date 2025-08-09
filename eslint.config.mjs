import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-empty-object-type": [
                "error",
                { allowObjectTypes: "always" },
            ],
            "@typescript-eslint/no-explicit-any": "off",
            "react/display-name": "off",
            "import/no-anonymous-default-export": "off",
            "react-hooks/exhaustive-deps": "off",
        },
    },
]

export default eslintConfig
