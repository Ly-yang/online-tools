// 创建占位组件的通用模板
const createPlaceholderTool = (toolName, description, features = []) => {
  return () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{toolName} 开发中</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {features.length > 0 && (
        <div className="text-left max-w-md mx-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-2">即将支持的功能：</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// CSS美化工具
export const CssBeautify = createPlaceholderTool(
  'CSS美化工具',
  'CSS代码格式化、美化和压缩工具',
  ['CSS代码格式化', 'CSS代码压缩', '语法高亮显示', '错误检测']
)

// HTML美化工具  
export const HtmlBeautify = createPlaceholderTool(
  'HTML美化工具', 
  'HTML代码格式化和美化工具',
  ['HTML代码格式化', 'HTML代码压缩', '标签自动补全', '语法验证']
)

// 正则表达式测试
export const RegexTest = createPlaceholderTool(
  '正则表达式测试',
  '在线测试和验证正则表达式',
  ['正则表达式匹配测试', '捕获组显示', '常用正则库', '代码生成']
)

// URL编码解码
export const UrlEncode = createPlaceholderTool(
  'URL编码解码',
  'URL编码和解码工具',
  ['URL编码', 'URL解码', '批量处理', '中文支持']
)

// SQL格式化
export const SqlFormatter = createPlaceholderTool(
  'SQL格式化',
  'SQL语句格式化和美化',
  ['SQL格式化', 'SQL压缩', '语法高亮', '多数据库支持']
)

// Markdown编辑器
export const MarkdownEditor = createPlaceholderTool(
  'Markdown编辑器',
  'Markdown在线编辑和预览',
  ['实时预览', '语法高亮', '导出HTML', '表格支持']
)

// 字数统计
export const WordCount = createPlaceholderTool(
  '字数统计',
  '统计文本字数、行数、段落数',
  ['字符统计', '单词统计', '行数统计', '段落统计']
)

// 文本对比
export const TextDiff = createPlaceholderTool(
  '文本对比',
  '比较两个文本的差异',
  ['逐行对比', '高亮差异', '合并文本', '导出结果']
)

// 大小写转换
export const CaseConvert = createPlaceholderTool(
  '大小写转换',
  '文本大小写转换工具',
  ['全部大写', '全部小写', '首字母大写', '驼峰命名']
)

// 文本替换
export const TextReplace = createPlaceholderTool(
  '文本替换',
  '批量替换文本内容',
  ['简单替换', '正则替换', '批量处理', '预览功能']
)

// 图片工具
export const ImageCompress = createPlaceholderTool(
  '图片压缩',
  '在线压缩图片，支持多种格式',
  ['JPEG/PNG/WebP压缩', '质量调节', '批量处理', '大小预览']
)

export const ImageResize = createPlaceholderTool(
  '图片尺寸调整',
  '调整图片大小和尺寸',
  ['自定义尺寸', '等比缩放', '批量处理', '格式转换']
)

export const ImageFormat = createPlaceholderTool(
  '图片格式转换',
  '转换图片格式',
  ['多格式支持', '质量控制', '批量转换', '元数据保留']
)

export const ImageBase64 = createPlaceholderTool(
  '图片Base64编码',
  '图片与Base64相互转换',
  ['图片转Base64', 'Base64转图片', '数据URI生成', '格式识别']
)

// 加密工具
export const ShaHash = createPlaceholderTool(
  'SHA加密',
  'SHA1/SHA256/SHA512哈希计算',
  ['SHA1/SHA256/SHA512', '文件哈希', '批量计算', 'HMAC支持']
)

export const AesEncrypt = createPlaceholderTool(
  'AES加密解密',
  'AES对称加密和解密',
  ['AES-128/192/256', '多种模式', '密钥生成', '安全随机数']
)

export const PasswordGenerator = createPlaceholderTool(
  '密码生成器',
  '生成安全的随机密码',
  ['自定义长度', '字符集选择', '排除相似字符', '批量生成']
)

// 转换工具
export const TimestampConvert = createPlaceholderTool(
  '时间戳转换',
  '时间戳与日期格式互转',
  ['Unix时间戳', '多种日期格式', '时区转换', '批量处理']
)

export const NumberBase = createPlaceholderTool(
  '进制转换',
  '数字进制转换工具',
  ['2/8/10/16进制', '自定义进制', '批量转换', '计算过程']
)

export const UnitConvert = createPlaceholderTool(
  '单位转换',
  '长度、重量、温度等单位转换',
  ['长度转换', '重量转换', '温度转换', '面积体积']
)

export const ColorConvert = createPlaceholderTool(
  '颜色转换',
  'RGB、HEX、HSL颜色格式转换',
  ['RGB/HEX/HSL', '颜色选择器', '调色板', '对比度检查']
)

// 生成工具
export const UuidGenerator = createPlaceholderTool(
  'UUID生成器',
  '生成唯一标识符UUID',
  ['UUID v1/v4', '批量生成', '格式选择', '验证功能']
)

export const LoremGenerator = createPlaceholderTool(
  'Lorem文本生成',
  '生成占位文本内容',
  ['Lorem Ipsum', '中文假文', '自定义长度', '段落控制']
)

export const FaviconGenerator = createPlaceholderTool(
  'Favicon生成',
  '生成网站图标文件',
  ['多尺寸生成', 'ICO格式', 'PNG图标', '预览功能']
)

// 实用工具
export const IpLookup = createPlaceholderTool(
  'IP查询',
  '查询IP地址归属地信息',
  ['IP归属地', 'ISP信息', '经纬度', '批量查询']
)

export const UrlShortener = createPlaceholderTool(
  'URL短链生成',
  '生成短链接',
  ['短链生成', '访问统计', '有效期设置', '自定义后缀']
)

export const WhoisLookup = createPlaceholderTool(
  'Whois查询',
  '域名信息查询',
  ['域名信息', '注册时间', '过期时间', 'DNS记录']
)

export const PingTest = createPlaceholderTool(
  'Ping测试',
  '网络连通性测试',
  ['延迟测试', '丢包率', '路由跟踪', '端口检测']
)
