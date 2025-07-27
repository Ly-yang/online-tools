import React, { useState, useCallback } from 'react'

const JsonFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError('')
    } catch (err) {
      setError(`JSON解析错误: ${err.message}`)
      setOutput('')
    }
  }, [input, indentSize])

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError(`JSON解析错误: ${err.message}`)
      setOutput('')
    }
  }, [input])

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError('请输入JSON内容')
      return
    }

    try {
      JSON.parse(input)
      setError('')
      alert('JSON格式正确！')
    } catch (err) {
      setError(`JSON格式错误: ${err.message}`)
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
    setError('')
  }

  return (
    <div className="space-y-6">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">缩进空格:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button onClick={formatJson} className="btn-primary text-sm">
            格式化
          </button>
          <button onClick={minifyJson} className="btn-secondary text-sm">
            压缩
          </button>
          <button onClick={validateJson} className="btn-secondary text-sm">
            验证
          </button>
          <button onClick={clearAll} className="btn-secondary text-sm">
            清空
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800 text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* 输入输出区域 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">输入JSON</h3>
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
            placeholder="请输入或粘贴JSON内容..."
            className="textarea-field font-mono text-sm h-96"
          />
          <div className="text-xs text-gray-500">
            字符数: {input.length}
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
            字符数: {output.length}
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">使用说明</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 在左侧输入框中粘贴或输入JSON内容</li>
          <li>• 点击"格式化"美化JSON格式，"压缩"移除多余空格</li>
          <li>• 点击"验证"检查JSON语法是否正确</li>
          <li>• 可以调整缩进空格数量来控制格式化样式</li>
        </ul>
      </div>
    </div>
  )
}

export default JsonFormatter
