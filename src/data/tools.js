
export const toolCategories = {
  development: [
    {
      id: 'json-formatter',
      name: 'JSON格式化',
      description: 'JSON美化、压缩、验证和编辑',
      icon: '📋',
      category: 'development',
      component: 'JsonFormatter'
    },
    {
      id: 'js-beautify',  
      name: 'JavaScript美化',
      description: 'JavaScript代码格式化和美化',
      icon: '🔧',
      category: 'development',
      component: 'JsBeautify'
    },
    {
      id: 'css-beautify',
      name: 'CSS美化',
      description: 'CSS代码格式化、美化和压缩',
      icon: '🎨',
      category: 'development', 
      component: 'CssBeautify'
    },
    {
      id: 'html-beautify',
      name: 'HTML美化',
      description: 'HTML代码格式化和美化',
      icon: '🌐',
      category: 'development',
      component: 'HtmlBeautify'
    },
    {
      id: 'regex-test',
      name: '正则表达式测试',
      description: '在线测试和验证正则表达式',
      icon: '🔍',
      category: 'development',
      component: 'RegexTest'
    },
    {
      id: 'url-encode',
      name: 'URL编码解码',
      description: 'URL编码和解码工具',
      icon: '🌐',
      category: 'development',
      component: 'UrlEncode'
    },
    {
      id: 'base64-encode',
      name: 'Base64编码',
      description: 'Base64编码和解码工具',
      icon: '📝',
      category: 'development',
      component: 'Base64Encode'
    },
    {
      id: 'sql-formatter',
      name: 'SQL格式化',
      description: 'SQL语句格式化和美化',
      icon: '🗃️',
      category: 'development',
      component: 'SqlFormatter'
    }
  ],
  
  text: [
    {
      id: 'markdown-editor',
      name: 'Markdown编辑器',
      description: 'Markdown在线编辑和预览',
      icon: '📝',
      category: 'text',
      component: 'MarkdownEditor'
    },
    {
      id: 'word-count',
      name: '字数统计',
      description: '统计文本字数、行数、段落数',
      icon: '📊',
      category: 'text', 
      component: 'WordCount'
    },
    {
      id: 'text-diff',
      name: '文本对比',
      description: '比较两个文本的差异',
      icon: '🔄',
      category: 'text',
      component: 'TextDiff'
    },
    {
      id: 'case-convert',
      name: '大小写转换',
      description: '文本大小写转换工具',
      icon: '🔤',
      category: 'text',
      component: 'CaseConvert'
    },
    {
      id: 'text-replace',
      name: '文本替换',
      description: '批量替换文本内容',
      icon: '✏️',
      category: 'text',
      component: 'TextReplace'
    }
  ],

  image: [
    {
      id: 'image-compress',
      name: '图片压缩',
      description: '在线压缩图片，支持多种格式',
      icon: '🖼️',
      category: 'image',
      component: 'ImageCompress'
    },
    {
      id: 'image-resize',
      name: '图片尺寸调整',
      description: '调整图片大小和尺寸',
      icon: '📐',
      category: 'image',
      component: 'ImageResize'
    },
    {
      id: 'image-format',
      name: '图片格式转换',
      description: '转换图片格式：JPG、PNG、WebP等',
      icon: '🔄',
      category: 'image',
      component: 'ImageFormat'
    },
    {
      id: 'image-base64',
      name: '图片Base64编码',
      description: '图片与Base64相互转换',
      icon: '📋',
      category: 'image',
      component: 'ImageBase64'
    }
  ],

  crypto: [
    {
      id: 'md5-hash',
      name: 'MD5加密',
      description: 'MD5哈希值计算',
      icon: '🔐',
      category: 'crypto',
      component: 'Md5Hash'
    },
    {
      id: 'sha-hash',
      name: 'SHA加密',
      description: 'SHA1/SHA256/SHA512哈希计算',
      icon: '🛡️',
      category: 'crypto',
      component: 'ShaHash'
    },
    {
      id: 'aes-encrypt',
      name: 'AES加密解密',
      description: 'AES对称加密和解密',
      icon: '🔒',
      category: 'crypto',
      component: 'AesEncrypt'
    },
    {
      id: 'password-generator',
      name: '密码生成器',
      description: '生成安全的随机密码',
      icon: '🗝️',
      category: 'crypto',
      component: 'PasswordGenerator'
    }
  ],

  convert: [
    {
      id: 'timestamp-convert',
      name: '时间戳转换',
      description: '时间戳与日期格式互转',
      icon: '⏰',
      category: 'convert',
      component: 'TimestampConvert'
    },
    {
      id: 'number-base',
      name: '进制转换',
      description: '二进制、八进制、十进制、十六进制转换',
      icon: '🔢',
      category: 'convert',
      component: 'NumberBase'
    },
    {
      id: 'unit-convert',
      name: '单位转换',
      description: '长度、重量、温度等单位转换',
      icon: '📏',
      category: 'convert',
      component: 'UnitConvert'
    },
    {
      id: 'color-convert',
      name: '颜色转换',
      description: 'RGB、HEX、HSL颜色格式转换',
      icon: '🎨',
      category: 'convert',
      component: 'ColorConvert'
    }
  ],

  generator: [
    {
      id: 'qr-generator',
      name: '二维码生成',
      description: '生成各种类型的二维码',
      icon: '📱',
      category: 'generator',
      component: 'QrGenerator'
    },
    {
      id: 'uuid-generator',
      name: 'UUID生成器',
      description: '生成唯一标识符UUID',
      icon: '🎲',
      category: 'generator',
      component: 'UuidGenerator'
    },
    {
      id: 'lorem-generator',
      name: 'Lorem文本生成',
      description: '生成占位文本内容',
      icon: '📄',
      category: 'generator',
      component: 'LoremGenerator'
    },
    {
      id: 'favicon-generator',
      name: 'Favicon生成',
      description: '生成网站图标文件',
      icon: '🌟',
      category: 'generator',
      component: 'FaviconGenerator'
    }
  ],

  utility: [
    {
      id: 'ip-lookup',
      name: 'IP查询',
      description: '查询IP地址归属地信息',
      icon: '🌍',
      category: 'utility',
      component: 'IpLookup'
    },
    {
      id: 'url-shortener',
      name: 'URL短链生成',
      description: '生成短链接',
      icon: '🔗',
      category: 'utility',
      component: 'UrlShortener'
    },
    {
      id: 'whois-lookup',
      name: 'Whois查询',
      description: '域名信息查询',
      icon: '🔍',
      category: 'utility',
      component: 'WhoisLookup'
    },
    {
      id: 'ping-test',
      name: 'Ping测试',
      description: '网络连通性测试',
      icon: '📡',
      category: 'utility',
      component: 'PingTest'
    }
  ]
}

export const categoryList = [
  { id: 'all', name: '所有工具', icon: '🏠' },
  { id: 'development', name: '开发工具', icon: '💻' },
  { id: 'text', name: '文本工具', icon: '📝' },
  { id: 'image', name: '图片工具', icon: '🖼️' },
  { id: 'crypto', name: '加密解密', icon: '🔐' },
  { id: 'convert', name: '转换工具', icon: '🔄' },
  { id: 'generator', name: '生成工具', icon: '⚡' },
  { id: 'utility', name: '实用工具', icon: '🛠️' }
]
