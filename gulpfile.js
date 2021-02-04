const path = require('path')
const gulp = require('gulp')
const watch = require('gulp-watch')
const apidoc = require('apidoc')

function buildApiDoc() {
  const doc = apidoc.createDoc({
    src: path.resolve(__dirname, './src'),
    dest: path.resolve(__dirname, './doc')
  })
  
  if (typeof doc !== 'boolean') {
    // 정상적으로 출력이 완료됨
    console.log('exported a new doc file')
    // console.log(doc.data) // `api_data.json` file content
    // console.log(doc.project) // `api_project.json` file content
  } else {
    console.error('cannot parse documentation')
  }
}

function watchAPI() {
  return watch('src/**/*.ts', { /* options */ }, buildApiDoc)
}

exports.watchAPI = watchAPI