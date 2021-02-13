const OSS = require('ali-oss');
const fs = require('fs');
const config = require('./config');

const cssPath = './dist/css/';
const jsPath = './dist/js/';

const client = new OSS(config.oss);

client.useBucket('lxyaitsy');

const cssFileList = fs.readdirSync(cssPath);
const jsFileList = fs.readdirSync(jsPath);

const uploadFiles = async () => {
  for (const cssFile of cssFileList) {
    try {
      await client.put(`css/${cssFile}`, `${cssPath}${cssFile}`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log('css files is uploaded');

  for (const jsFile of jsFileList) {
    try {
      await client.put(`js/${jsFile}`, `${jsPath}${jsFile}`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log('js files is uploaded');
};

uploadFiles();
