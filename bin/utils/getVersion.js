import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../../', 'package.json'), 'utf8'));
const VERSION = packageJson.version;
export default VERSION;
//# sourceMappingURL=getVersion.js.map