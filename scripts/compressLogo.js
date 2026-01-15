const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const INPUT_PATH = path.join(__dirname, '../src/assets/images/logo.png')
const OUTPUT_PATH = path.join(__dirname, '../src/assets/images/logo.png')
const TARGET_SIZE = 192

async function compressLogo() {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(INPUT_PATH)) {
      console.error('Logo file not found:', INPUT_PATH)
      return
    }

    // 压缩并调整大小
    await sharp(INPUT_PATH)
      .resize(TARGET_SIZE, TARGET_SIZE, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 75, compressionLevel: 9 })
      .toFile(OUTPUT_PATH + '.tmp')

    // 替换原文件
    fs.renameSync(OUTPUT_PATH + '.tmp', OUTPUT_PATH)

    console.log(
      `✅ Logo compressed successfully to ${TARGET_SIZE}x${TARGET_SIZE}`
    )

    // 显示文件大小
    const stats = fs.statSync(OUTPUT_PATH)
    console.log(`📦 File size: ${(stats.size / 1024).toFixed(2)} KB`)
  } catch (error) {
    console.error('Error compressing logo:', error)
  }
}

compressLogo()
