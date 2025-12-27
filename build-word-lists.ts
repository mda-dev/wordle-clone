import { promises as fs } from "fs";

const wordListSrcDir = "./src/word-lists";
const wordListDestDir = "./public";

const buildWordLists = async (locale?: string) => {
  const cwd = [wordListSrcDir, locale].join("/");
  const content = await fs.readdir(cwd);

  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    const stat = await fs.stat(cwd + "/" + item);
    if (stat.isDirectory()) {
      buildWordLists(item);
    } else {
      formatFile(item, locale);
    }
  }
};

// removes any duplicate values from json file
const formatFile = async (fileName: string, locale?: string) => {
  const filePath = [wordListSrcDir, locale, fileName].join("/");
  const saveName = `${locale}-${fileName}`;

  try {
    const file = await fs.readFile(filePath, { encoding: "utf-8" });
    const wordArray: string[] = JSON.parse(file);
    const processed = new Set(wordArray);

    await saveWordList([...processed], saveName);
  } catch (error) {
    console.error(`Failed to procees file: ${fileName} `, error.message);
  }
};

const saveWordList = async (wordList: string[], fileName: string) => {
  const filePath = [wordListDestDir, fileName].join("/");
  try {
    await fs.writeFile(filePath, JSON.stringify(wordList), {
      encoding: "utf-8",
    });
    console.log("File saved!", { filePath });
  } catch (error) {
    console.error(`Failed to save ${filePath}`, error.message);
  }
};

buildWordLists();
