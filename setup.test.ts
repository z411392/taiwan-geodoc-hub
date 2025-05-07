import "reflect-metadata"

import { config } from "dotenv"
import { existsSync } from "fs"

if (existsSync(".env")) config({ path: ".env", override: true })
if (existsSync(".env.test")) config({ path: ".env.test", override: true })
