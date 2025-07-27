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
