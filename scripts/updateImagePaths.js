const fs = require('fs')
const path = require('path')

// 需要更新的目录
const directories = [path.join(__dirname, '../src/pkg_main/pages')]

// 递归遍历目录
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walkDir(filePath, callback)
    } else if (file.endsWith('.ux')) {
      callback(filePath)
    }
  })
}

// 更新文件内容
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let updated = false

  // 替换图片路径 /assets/img/ -> /pkg_main/assets/img/
  const newContent = content.replace(
    /(['"])\/assets\/img\//g,
    '$1/pkg_main/assets/img/'
  )

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`✅ Updated: ${filePath}`)
    updated = true
  }

  return updated
}

// 主函数
function main() {
  console.log('🚀 Starting to update image paths...\n')

  let totalUpdated = 0

  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      walkDir(dir, filePath => {
        if (updateFile(filePath)) {
          totalUpdated++
        }
      })
    }
  })

  console.log(`\n✨ Done! Updated ${totalUpdated} files.`)
}

main()
