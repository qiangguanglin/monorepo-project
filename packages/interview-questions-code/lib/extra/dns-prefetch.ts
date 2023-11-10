import urlRegex from "url-regex";
import fs from "fs";
import path from "path";
import { parse } from "node-html-parser";
import { glob } from "glob";
import minimist from "minimist";

/**
 * 支持两个入参
 * @param target 目标路径，会组装执行脚本的目录（package.json路径）+目标路径
 * @param type 需要解析url的文件类型，用于获取其中的url参数
 */
const parsedArgv = minimist(process.argv.slice(2));
const urlPattern = /(https?:\/\/[^/]*)/i;
const urls = new Set();
const basePath = path.resolve(process.cwd(), parsedArgv.target);
const typeArr = JSON.parse(parsedArgv.type || []);
const type = typeArr.join(",") || "html,css";

// 遍历所有目标路径文件夹中的所有HTML、js、css文件
function searchDomain() {
  const files = glob.sync(`${basePath}/**/*.{${type}}`);
  if (files.length) {
    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      // 匹配是文本中的url链接
      const matches = source.match(urlRegex({ strict: true }));
      if (matches) {
        matches.forEach((url) => {
          const match = url.match(urlPattern);
          if (match && match[1]) {
            urls.add(match[1]);
          }
        });
      }
    }
  }
}

function insertLink() {
  const files = glob.sync(`${basePath}/**/*.html`);
  const links = [...urls]
    .map((url) => `\t\t<link rel="dns-prefetch" href="${url}" />`)
    .join("\n");
  for (const file of files) {
    const html = fs.readFileSync(file, "utf-8");
    // node.js的html解析器，可以对其进行遍历元素、更改属性、插入新元素等操作
    const root = parse(html);
    const head = root.querySelector("head");
    head?.insertAdjacentHTML("afterbegin", `\n${links}`);
    fs.writeFileSync(file, root.toString());
  }
}

function main() {
  searchDomain();
  insertLink();
}
main();
