import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default function getDirName(importObject) {
    const __filename = fileURLToPath(importObject);
    return dirname(__filename);
}
