import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const key = process.env.ZHIPU_API_KEY || 'MISSING_KEY';
content = content.replace(/__ZHIPU_API_KEY__/g, key);

fs.writeFileSync(filePath, content);
console.log('ZHIPU API Key injected successfully.');
