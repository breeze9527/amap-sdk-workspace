require('dotenv').config();
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const fsp = fs.promises;

function toKebabCase(str) {
    return str.replace(/(\d*)[A-Z]/g, (subStr, num, index) => {
        const newStr = subStr.toLowerCase();
        return index === 0 || num ? newStr : `-${newStr}`;
    });
}

async function createType(typeName, deps) {
    console.log(`Create type: ${typeName}`);
    await fse.ensureDir(templatePath);
    const targetPath = path.join(typesPath, typeName);
    if (fs.existsSync(targetPath)) {
        console.error(`path: ${targetPath} already exist`);
        return;
    }
    await fse.ensureDir(targetPath);
    // read content from index.d.ts
    const definitionContent = await fsp.readFile(path.join(templatePath, 'index.d.ts'), { encoding: 'utf8' });
    const newContent = [];
    newContent.push(`// TypeScript Version: ${env.TYPESCRIPT_VERSION}`);
    newContent.push('');
    if (deps.length) {
        newContent.push(...deps.map(dep => `/// <reference types="${dep}" />`));
        newContent.push('');
    }
    newContent.push(definitionContent);
    await Promise.all([
        // tsconfig.json
        fsp.copyFile(path.join(templatePath, 'tsconfig.json'), path.join(targetPath, 'tsconfig.json')),
        // index.d.ts
        fsp.writeFile(path.join(targetPath, 'index.d.ts'), newContent.join('\n')),
        // tests.ts
        fsp.writeFile(path.join(targetPath, `${typeName}-tests.ts`), ''),
        // tslint.json
        fsp.copyFile(path.join(templatePath, 'tslint.json'), path.join(targetPath, 'tslint.json')),
        // meta.json
        fsp.copyFile(path.join(templatePath, 'meta.json'), path.join(targetPath, 'meta.json'))
    ]);
    console.log('Create complete');
}

const env = process.env;
const cwd = process.cwd();
const templatePath = path.join(cwd, env.TYPE_TEMPLATE_DIR);
const typesPath = path.join(cwd, env.TYPES_DIR);
const [name, ...args] = process.argv.slice(2);
const argList = {
    dep: []
}
let curArgFlag;
args.forEach(item => {
    // flag
    if (item[0] === '-') {
        switch (item.substr(1)) {
            case 'D':
                curArgFlag = 'dep';
                break;
        }
    } else if (curArgFlag && argList.hasOwnProperty(curArgFlag)) {
        const target = argList[curArgFlag];
        if (Array.isArray(target)) {
            target.push(item);
        } else {
            argList[curArgFlag] = item;
        }
    }
});

if (!name) {
    throw new Error('missing param: name');
}

createType(name, argList.dep)
