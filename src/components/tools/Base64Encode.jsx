import React, { useState, useCallback } from 'react'

const Base64Encode = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode') // 'encode' | 'decode'
  const [encoding, setEncoding] = useState('utf8')
  const [error, setError] = useState('')

  const processText = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      if (mode === 'encode') {
        // 编码
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
        setError('')
      } else {
        // 解码
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
        setError('')
      }
    } catch (err) {
      setError(`${mode === 'encode' ? '编码' : '解码'}失败: ${err.message}`)
      setOutput('')
    }
  }, [input, mode])

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

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-6">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">模式:</label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'encode'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              编码
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'decode'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              解码
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">编码:</label>
          <select
            value={encoding}
            onChange={(e) => setEncoding(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="utf8">UTF-8</option>
            <option value="ascii">ASCII</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button onClick={processText} className="btn-primary text-sm">
            {mode === 'encode' ? '编码' : '解码'}
          </button>
          <button onClick={switchMode} className="btn-secondary text-sm">
            切换模式
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
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === 'encode' ? '原始文本' : 'Base64编码'}
            </h3>
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
            placeholder={mode === 'encode' ? '请输入要编码的文本...' : '请输入Base64编码...'}
            className="textarea-field font-mono text-sm h-64"
          />
          <div className="text-xs text-gray-500">
            字符数: {input.length} | 字节数: {new Blob([input]).size}
          </div>
        </div>

        {/* 输出区域 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === 'encode' ? 'Base64编码' : '解码结果'}
            </h3>
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
            placeholder={`${mode === 'encode' ? '编码' : '解码'}结果将显示在这里...`}
            className="textarea-field font-mono text-sm h-64 bg-gray-50"
          />
          <div className="text-xs text-gray-500">
            字符数: {output.length} | 字节数: {new Blob([output]).size}
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">使用说明</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Base64是一种基于64个可打印字符来表示二进制数据的编码方法</li>
          <li>• 常用于在HTTP环境下传递较长的标识信息</li>
          <li>• 支持UTF-8和ASCII编码格式</li>
          <li>• 可以一键切换编码和解码模式</li>
          <li>• 编码后的文本长度约为原文本的4/3倍</li>
        </ul>
      </div>
    </div>
  )
}

export default Base64Encode
