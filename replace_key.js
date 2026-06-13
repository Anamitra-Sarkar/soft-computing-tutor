const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const key = process.env.GROQ_API_KEY || 'MISSING_KEY';
content = content.replace(/__GROQ_API_KEY__/g, key);

fs.writeFileSync(filePath, content);
console.log('API Key injected successfully.');
