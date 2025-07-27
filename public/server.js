const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')

const app = express()
const PORT = process.env.PORT || 3001

// 安全中间件
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}))

// 基础中间件
app.use(compression())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 文件上传配置
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    // 允许的文件类型
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp',
      'text/plain',
      'application/json',
      'text/csv'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('不支持的文件类型'), false)
    }
  }
})

// API路由

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// JSON格式化API
app.post('/api/tools/json-format', (req, res) => {
  try {
    const { input, indent = 2 } = req.body
    
    if (!input) {
      return res.status(400).json({ error: '输入内容不能为空' })
    }
    
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed, null, indent)
    
    res.json({
      success: true,
      output: formatted,
      stats: {
        inputLength: input.length,
        outputLength: formatted.length
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: `JSON解析错误: ${error.message}`
    })
  }
})

// Base64编码API
app.post('/api/tools/base64', (req, res) => {
  try {
    const { input, mode } = req.body
    
    if (!input) {
      return res.status(400).json({ error: '输入内容不能为空' })
    }
    
    let output
    if (mode === 'encode') {
      output = Buffer.from(input, 'utf8').toString('base64')
    } else if (mode === 'decode') {
      output = Buffer.from(input, 'base64').toString('utf8')
    } else {
      return res.status(400).json({ error: '无效的模式' })
    }
    
    res.json({
      success: true,
      output,
      mode
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: `处理失败: ${error.message}`
    })
  }
})

// MD5哈希API
app.post('/api/tools/md5', (req, res) => {
  try {
    const { input } = req.body
    
    if (!input) {
      return res.status(400).json({ error: '输入内容不能为空' })
    }
    
    const hash = crypto.createHash('md5').update(input, 'utf8').digest('hex')
    
    res.json({
      success: true,
      output: hash,
      algorithm: 'MD5',
      length: hash.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `哈希计算失败: ${error.message}`
    })
  }
})

// SHA哈希API
app.post('/api/tools/sha', (req, res) => {
  try {
    const { input, algorithm = 'sha256' } = req.body
    
    if (!input) {
      return res.status(400).json({ error: '输入内容不能为空' })
    }
    
    const validAlgorithms = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512']
    if (!validAlgorithms.includes(algorithm)) {
      return res.status(400).json({ error: '不支持的哈希算法' })
    }
    
    const hash = crypto.createHash(algorithm).update(input, 'utf8').digest('hex')
    
    res.json({
      success: true,
      output: hash,
      algorithm: algorithm.toUpperCase(),
      length: hash.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `哈希计算失败: ${error.message}`
    })
  }
})

// UUID生成API
app.post('/api/tools/uuid', (req, res) => {
  try {
    const { count = 1, version = 4 } = req.body
    
    if (count > 100) {
      return res.status(400).json({ error: '一次最多生成100个UUID' })
    }
    
    const uuids = []
    for (let i = 0; i < count; i++) {
      if (version === 4) {
        // UUID v4 (随机)
        const uuid = crypto.randomUUID()
        uuids.push(uuid)
      } else {
        return res.status(400).json({ error: '目前只支持UUID v4' })
      }
    }
    
    res.json({
      success: true,
      uuids,
      count: uuids.length,
      version
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `UUID生成失败: ${error.message}`
    })
  }
})

// 文件上传处理
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有上传文件' })
    }
    
    const fileInfo = {
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer.toString('base64')
    }
    
    res.json({
      success: true,
      file: fileInfo
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `文件上传失败: ${error.message}`
    })
  }
})

// 静态文件服务
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error)
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '文件大小超出限制' })
    }
  }
  
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? '服务器内部错误' 
      : error.message
  })
})

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`)
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`)
  console.log(`访问地址: http://localhost:${PORT}`)
})
