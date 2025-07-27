import React, { useState, useCallback } from 'react'

const JsBeautify = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [options, setOptions] = useState({
    indentSize: 2,
    indentChar: ' ',
    maxPreserveNewlines: 2,
    preserveNewlines: true,
    keepArrayIndentation: false,
    breakChainedMethods: false,
    insertFinalNewline: false,
    wrapLineLength: 0
  })

  // 简单的JavaScript美化函数
  const beautifyJs = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      let code = input
      let indentLevel = 0
      let result = ''
      let inString = false
      let stringChar = ''
      let i = 0

      const indent = options.indentChar.repeat(options.indentSize)

      while (i < code.length) {
        const char = code[i]
        const nextChar = code[i + 1]

        // 处理字符串
        if (!inString && (char === '"' || char === "'" || char === '`')) {
          inString = true
          stringChar = char
          result += char
        } else if (inString && char === stringChar && code[i - 1] !== '\\') {
          inString = false
          result += char
        } else if (inString) {
          result += char
        } else {
          // 处理代码结构
          switch (char) {
            case '{':
              result += char
              if (nextChar !== '}') {
                result += '\n'
                indentLevel++
                result += indent.repeat(indentLevel)
              }
              break
            case '}':
              if (result.trim().endsWith('{')) {
                result += char
              } else {
                indentLevel = Math.max(0, indentLevel - 1)
                result = result.trimEnd() + '\n' + indent.repeat(indentLevel) + char
              }
              if (nextChar && nextChar !== ',' && nextChar !== ';' && nextChar !== '}' && nextChar !== ')') {
                result += '\n' + indent.repeat(indentLevel)
              }
              break
            case ';':
              result += char
              if (nextChar && nextChar !== '}' && nextChar !== ')') {
                result += '\n' + indent.repeat(indentLevel)
              }
              break
            case ',':
              result += char
              if (nextChar && nextChar !== '}' && nextChar !== ']') {
                result += '\n' + indent.repeat(indentLevel)
              }
              break
            case '(':
              result += char
              break
            case ')':
              result += char
              break
            case '[':
              result += char
              break
            case ']':
              result += char
              break
            default:
              if (char === '\n' || char === '\r') {
                // 跳过原有的换行
              } else if (char === ' ' || char === '\t') {
                // 处理空格
                if (result && !result.endsWith(' ') && !result.endsWith('\n')) {
                  result += ' '
                }
              } else {
                result += char
              }
          }
        }
        i++
      }

      // 清理多余的空行
      result = result.replace(/\n\s*\n\s*\n/g, '\n\n')
      setOutput(result.trim())
    } catch (err) {
      setOutput(`格式化失败: ${err.message}`)
    }
  }, [input, options])

  const minifyJs = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      let code = input
      let result = ''
      let inString = false
      let stringChar = ''
      let i = 0

      while (i < code.length) {
        const char = code[i]
        const nextChar = code[i + 1]
        const prevChar = code[i - 1]

        // 处理字符串
        if (!inString && (char === '"' || char === "'" || char === '`')) {
          inString = true
          stringChar = char
          result += char
        } else if (inString && char === stringChar && code[i - 1] !== '\\') {
          inString = false
          result += char
        } else if (inString) {
          result += char
        } else {
          // 移除注释和多余空格
          if (char === '/' && nextChar === '/') {
            // 跳过单行注释
            while (i < code.length && code[i] !== '\n') {
              i++
            }
            continue
          } else if (char === '/' && nextChar === '*') {
            // 跳过多行注释
            i += 2
            while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) {
              i++
            }
            i += 2
            continue
          } else if (char === '\n' || char === '\r' || char === '\t') {
            // 移除换行和制表符
            continue
          } else if (char === ' ') {
            // 只在必要时保留空格
            if (prevChar && nextChar && 
                /[a-zA-Z0-9_$]/.test(prevChar) && 
                /[a-zA-Z0-9_$]/.test(nextChar)) {
              result += char
            }
          } else {
            result += char
          }
        }
        i++
      }

      setOutput(result)
    } catch (err) {
      setOutput(`压缩失败: ${err.message}`)
    }
  }, [input])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('已复制到剪贴板')
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="space-y-6">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">缩进:</label>
          <select
            value={options.indentSize}
            onChange={(e) => setOptions({...options, indentSize: Number(e.target.value)})}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={2}>2空格</option>
            <option value={4}>4空格</option>
            <option value={8}>8空格</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button onClick={beautifyJs} className="btn-primary text-sm">
            格式化
          </button>
          <button onClick={minifyJs} className="btn-secondary text-sm">
            压缩
          </button>
          <button onClick={clearAll} className="btn-secondary text-sm">
            清空
          </button>
        </div>
      </div>

      {/* 输入输出区域 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">输入JavaScript代码</h3>
            <button
              onClick={() => copyToClipboard(input)}
              className="text-sm text-primary-600 hover:text-primary-700"
              disabled={!input}
            >
              复制
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入JavaScript代码..."
            className="textarea-field font-mono text-sm h-96"
          />
          <div className="text-xs text-gray-500">
            字符数: {input.length} | 行数: {input.split('\n').length}
          </div>
        </div>

        {/* 输出区域 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">格式化结果</h3>
            <button
              onClick={() => copyToClipboard(output)}
              className="text-sm text-primary-600 hover:text-primary-700"
              disabled={!output}
            >
              复制
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="格式化结果将显示在这里..."
            className="textarea-field font-mono text-sm h-96 bg-gray-50"
          />
          <div className="text-xs text-gray-500">
            字符数: {output.length} | 行数: {output.split('\n').length}
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">使用说明</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 支持JavaScript代码格式化和美化</li>
          <li>• 可以压缩代码移除注释和多余空格</li>
          <li>• 支持自定义缩进大小</li>
          <li>• 自动处理字符串内容，避免误格式化</li>
        </ul>
      </div>
    </div>
  )
}

export default JsBeautify
