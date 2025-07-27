# online-tools
一个在线工具网站，网站包含了程序员常用的各种工具，采用现代化的技术栈开发。

# 在线工具箱

一个功能丰富的在线工具网站，提供程序员日常开发所需的各种实用工具。类似于 tool.lu，但功能更加完善，界面更加现代化。

## 🚀 功能特性

### 开发工具
- [x] JSON格式化和验证
- [x] JavaScript代码美化
- [x] Base64编码解码
- [x] MD5哈希计算
- [ ] CSS代码美化
- [ ] HTML代码美化
- [ ] 正则表达式测试
- [ ] URL编码解码
- [ ] SQL格式化

### 文本工具
- [ ] Markdown编辑器
- [ ] 字数统计
- [ ] 文本对比
- [ ] 大小写转换
- [ ] 文本替换

### 图片工具
- [ ] 图片压缩
- [ ] 图片尺寸调整
- [ ] 图片格式转换
- [ ] 图片Base64编码

### 加密解密
- [x] MD5加密
- [ ] SHA加密
- [ ] AES加密解密
- [ ] 密码生成器

### 转换工具
- [ ] 时间戳转换
- [ ] 进制转换
- [ ] 单位转换
- [ ] 颜色转换

### 生成工具
- [x] 二维码生成
- [ ] UUID生成器
- [ ] Lorem文本生成
- [ ] Favicon生成

### 实用工具
- [ ] IP查询
- [ ] URL短链生成
- [ ] Whois查询
- [ ] Ping测试

## 🛠️ 技术栈

### 前端
- **React 18** - 用户界面构建
- **Vite** - 构建工具和开发服务器
- **Tailwind CSS** - 样式框架
- **现代化设计** - 响应式布局，暗色主题支持

### 后端
- **Node.js** - 运行时环境
- **Express.js** - Web应用框架
- **Multer** - 文件上传处理
- **Helmet** - 安全中间件
- **CORS** - 跨域资源共享

### 安全特性
- 内容安全策略 (CSP)
- 文件类型验证
- 文件大小限制
- 输入验证和清理
- 错误处理和日志记录

## 📦 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 1. 克隆项目
```bash
git clone https://github.com/your-username/online-tools.git
cd online-tools
```

### 2. 安装依赖
```bash
npm install
```

### 3. 开发模式运行
```bash
# 启动前端开发服务器
npm run dev

# 启动后端服务器 (新终端)
npm run start
```

### 4. 生产环境构建
```bash
# 构建前端资源
npm run build

# 启动生产服务器
NODE_ENV=production npm start
```

## 🚀 部署指南

### Docker部署
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
```

### Nginx配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 环境变量
```bash
# .env
NODE_ENV=production
PORT=3001
```

## 🔧 API文档

### 基础接口

#### 健康检查
```
GET /api/health
```

#### 文件上传
```
POST /api/upload
Content-Type: multipart/form-data
```

### 工具接口

#### JSON格式化
```
POST /api/tools/json-format
Content-Type: application/json

{
  "input": "{'test': 'value'}",
  "indent": 2
}
```

#### Base64编码
```
POST /api/tools/base64
Content-Type: application/json

{
  "input": "Hello World",
  "mode": "encode" // 或 "decode"
}
```

#### MD5哈希
```
POST /api/tools/md5
Content-Type: application/json

{
  "input": "Hello World"
}
```

#### UUID生成
```
POST /api/tools/uuid
Content-Type: application/json

{
  "count": 5,
  "version": 4
}
```


署
```bash
# 使用Docker Compose
docker-compose up -d

# 或使用部署脚本
chmod +x deploy.sh
sudo ./deploy.sh production docker
```

### 3. 传统部署
```bash
# 使用PM2
sudo ./deploy.sh production pm2

# 或独立部署
sudo ./deploy.sh production standalone
```

## 📂 项目结构

```
online-tools/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # 头部组件
│   │   ├── Sidebar.jsx         # 侧边栏
│   │   ├── ToolCard.jsx        # 工具卡片
│   │   ├── ToolModal.jsx       # 工具模态框
│   │   ├── ToolRenderer.jsx    # 工具渲染器
│   │   └── tools/              # 具体工具组件
│   │       ├── JsonFormatter.jsx
│   │       ├── JsBeautify.jsx
│   │       ├── Base64Encode.jsx
│   │       ├── Md5Hash.jsx
│   │       ├── QrGenerator.jsx
│   │       └── index.js        # 其他工具占位
│   ├── data/
│   │   └── tools.js            # 工具配置数据
│   ├── App.jsx                 # 主应用组件
│   ├── main.js                 # 入口文件
│   └── index.css               # 全局样式
├── public/                     # 静态资源
├── server.js                   # 后端服务器
├── package.json                # 项目配置
├── vite.config.js              # Vite配置
├── tailwind.config.js          # Tailwind配置
├── Dockerfile                  # Docker配置
├── docker-compose.yml          # Docker Compose
├── deploy.sh                   # 部署脚本
├── .github/workflows/          # GitHub Actions
└── README.md                   # 项目文档
```

## 🔧 扩展指南

### 添加新工具
1. 在 `src/components/tools/` 创建新组件
2. 在 `src/data/tools.js` 添加工具配置
3. 在 `ToolRenderer.jsx` 中注册组件
4. 必要时在 `server.js` 添加API接口

### 示例：添加URL编码工具
```javascript
// src/components/tools/UrlEncode.jsx
import React, { useState } from 'react'

const UrlEncode = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const processUrl = () => {
    if (mode === 'encode') {
      setOutput(encodeURIComponent(input))
    } else {
      setOutput(decodeURIComponent(input))
    }
  }

  return (
    <div className="space-y-6">
      {/* 工具界面实现 */}
    </div>
  )
}

export default UrlEncode
```

## 🎨 界面截图

### 主页面
- 现代化卡片布局
- 工具分类导航
- 实时搜索功能

### 工具页面  
- 模态框设计
- 双栏输入输出
- 实时处理预览

## 📊 性能优化

### 前端优化
- Vite构建优化
- 代码分割和懒加载
- Tailwind CSS PurgeCSS
- 静态资源压缩

### 后端优化
- 压缩中间件
- 安全头配置
- 文件上传限制
- API响应缓存

### 部署优化
- Nginx反向代理
- HTTP/2支持
- Gzip压缩
- 静态资源缓存

## 🧪 测试和监控

### 测试覆盖
- 单元测试框架
- 组件测试
- API接口测试
- E2E测试

### 监控指标
- Lighthouse性能评分
- 服务器健康检查
- 错误日志收集
- 用户访问统计

## 🔄 持续集成

### GitHub Actions流程
1. 代码检查和测试
2. 构建项目
3. Docker镜像构建
4. 自动部署到服务器
5. 健康检查和回滚

### 质量保证
- ESLint代码规范
- Prettier代码格式化
- Husky Git钩子
- 提交信息规范

## 🛡️ 安全考虑

### 输入验证
- 文件类型检查
- 文件大小限制
- 内容安全过滤
- SQL注入防护

### 访问控制
- CORS配置
- 请求频率限制
- IP白名单
- API密钥认证

## 📈 扩展计划

### 短期目标
- [ ] 完善所有基础工具
- [ ] 添加用户偏好设置
- [ ] 实现工具使用统计
- [ ] 优化移动端体验

### 长期规划
- [ ] 用户账户系统
- [ ] 工具收藏功能
- [ ] 批量处理支持
- [ ] API接口开放
- [ ] 插件系统


你可以直接将这些文件保存到本地，然后按照README中的说明进行部署。项目支持多种部署方式，可以适应不同的服务器环境。


## 🎨 界面预览

### 主页面
- 现代化卡片式布局
- 分类导航侧边栏
- 实时搜索功能
- 响应式设计

### 工具页面
- 模态框式工具界面
- 实时预览功能
- 一键复制结果
- 批量处理支持

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 使用 ESLint 和 Prettier
- 遵循 React Hooks 最佳实践
- 编写单元测试
- 更新文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢 [tool.lu](https://tool.lu) 提供的灵感
- 感谢所有开源库的贡献者
- 感谢社区的反馈和建议

## ⭐ Star History

如果这个项目对你有帮助，请给它一个星星！

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/online-tools&type=Date)](https://star-history.com/#your-username/online-tools&Date)

---

**在线工具箱** - 让开发更高效 🚀
