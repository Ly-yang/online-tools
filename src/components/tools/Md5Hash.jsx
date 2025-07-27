import React, { useState, useCallback } from 'react'

// 简化的MD5实现
const MD5 = (() => {
  const rotateLeft = (lValue, iShiftBits) => {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  }

  const addUnsigned = (lX, lY) => {
    const lX4 = (lX & 0x40000000)
    const lY4 = (lY & 0x40000000)
    const lX8 = (lX & 0x80000000)
    const lY8 = (lY & 0x80000000)
    const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
      }
    } else {
      return (lResult ^ lX8 ^ lY8)
    }
  }

  const F = (x, y, z) => { return (x & y) | ((~x) & z) }
  const G = (x, y, z) => { return (x & z) | (y & (~z)) }
  const H = (x, y, z) => { return (x ^ y ^ z) }
  const I = (x, y, z) => { return (y ^ (x | (~z))) }

  const FF = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const GG = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const HH = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const II = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const convertToWordArray = (string) => {
    let lWordCount
    const lMessageLength = string.length
    const lNumberOfWordsTemp1 = lMessageLength + 8
    const lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
    const lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
    const lWordArray = Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
      lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordArray
  }

  const wordToHex = (lValue) => {
    let wordToHexValue = ''
    let wordToHexValueTemp = ''
    let lByte, lCount
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      wordToHexValueTemp = '0' + lByte.toString(16)
      wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2)
    }
    return wordToHexValue
  }

  return (string) => {
    const x = convertToWordArray(string)
    let a = 0x67452301
    let b = 0xEFCDAB89
    let c = 0x98BADCFE
    let d = 0x10325476

    for (let k = 0; k < x.length; k += 16) {
      const AA = a
      const BB = b
      const CC = c
      const DD = d
      a = FF(a, b, c, d, x[k + 0], 7, 0xD76AA478)
      d = FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756)
      c = FF(c, d, a, b, x[k + 2], 17, 0x242070DB)
      b = FF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE)
      a = FF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF)
      d = FF(d, a, b, c, x[k + 5], 12, 0x4787C62A)
      c = FF(c, d, a, b, x[k + 6], 17, 0xA8304613)
      b = FF(b, c, d, a, x[k + 7], 22, 0xFD469501)
      a = FF(a, b, c, d, x[k + 8], 7, 0x698098D8)
      d = FF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF)
      c = FF(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1)
      b = FF(b, c, d, a, x[k + 11], 22, 0x895CD7BE)
      a = FF(a, b, c, d, x[k + 12], 7, 0x6B901122)
      d = FF(d, a, b, c, x[k + 13], 12, 0xFD987193)
      c = FF(c, d, a, b, x[k + 14], 17, 0xA679438E)
      b = FF(b, c, d, a, x[k + 15], 22, 0x49B40821)
      a = GG(a, b, c, d, x[k + 1], 5, 0xF61E2562)
      d = GG(d, a, b, c, x[k + 6], 9, 0xC040B340)
      c = GG(c, d, a, b, x[k + 11], 14, 0x265E5A51)
      b = GG(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA)
      a = GG(a, b, c, d, x[k + 5], 5, 0xD62F105D)
      d = GG(d, a, b, c, x[k + 10], 9, 0x2441453)
      c = GG(c, d, a, b, x[k + 15], 14, 0xD8A1E681)
      b = GG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8)
      a = GG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6)
      d = GG(d, a, b, c, x[k + 14], 9, 0xC33707D6)
      c = GG(c, d, a, b, x[k + 3], 14, 0xF4D50D87)
      b = GG(b, c, d, a, x[k + 8], 20, 0x455A14ED)
      a = GG(a, b, c, d, x[k + 13], 5, 0xA9E3E905)
      d = GG(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8)
      c = GG(c, d, a, b, x[k + 7], 14, 0x676F02D9)
      b = GG(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A)
      a = HH(a, b, c, d, x[k + 5], 4, 0xFFFA3942)
      d = HH(d, a, b, c, x[k + 8], 11, 0x8771F681)
      c = HH(c, d, a, b, x[k + 11], 16, 0x6D9D6122)
      b = HH(b, c, d, a, x[k + 14], 23, 0xFDE5380C)
      a = HH(a, b, c, d, x[k + 1], 4, 0xA4BEEA44)
      d = HH(d, a, b, c, x[k + 4], 11, 0x4BDECFA9)
      c = HH(c, d, a, b, x[k + 7], 16, 0xF6BB4B60)
      b = HH(b, c, d, a, x[k + 10], 23, 0xBEBFBC70)
      a = HH(a, b, c, d, x[k + 13], 4, 0x289B7EC6)
      d = HH(d, a, b, c, x[k + 0], 11, 0xEAA127FA)
      c = HH(c, d, a, b, x[k + 3], 16, 0xD4EF3085)
      b = HH(b, c, d, a, x[k + 6], 23, 0x4881D05)
      a = HH(a, b, c, d, x[k + 9], 4, 0xD9D4D039)
      d = HH(d, a, b, c, x[k + 12], 11, 0xE6DB99E5)
      c = HH(c, d, a, b, x[k + 15], 16, 0x1FA27CF8)
      b = HH(b, c, d, a, x[k + 2], 23, 0xC4AC5665)
      a = II(a, b, c, d, x[k + 0], 6, 0xF4292244)
      d = II(d, a, b, c, x[k + 7], 10, 0x432AFF97)
      c = II(c, d, a, b, x[k + 14], 15, 0xAB9423A7)
      b = II(b, c, d, a, x[k + 5], 21, 0xFC93A039)
      a = II(a, b, c, d, x[k + 12], 6, 0x655B59C3)
      d = II(d, a, b, c, x[k + 3], 10, 0x8F0CCC92)
      c = II(c, d, a, b, x[k + 10], 15, 0xFFEFF47D)
      b = II(b, c, d, a, x[k + 1], 21, 0x85845DD1)
      a = II(a, b, c, d, x[k + 8], 6, 0x6FA87E4F)
      d = II(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0)
      c = II(c, d, a, b, x[k + 6], 15, 0xA3014314)
      b = II(b, c, d, a, x[k + 13], 21, 0x4E0811A1)
      a = II(a, b, c, d, x[k + 4], 6, 0xF7537E82)
      d = II(d, a, b, c, x[k + 11], 10, 0xBD3AF235)
      c = II(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB)
      b = II(b, c, d, a, x[k + 9], 21, 0xEB86D391)
      a = addUnsigned(a, AA)
      b = addUnsigned(b, BB)
      c = addUnsigned(c, CC)
      d = addUnsigned(d, DD)
    }

    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase()
  }
})()

const Md5Hash = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputFormat, setOutputFormat] = useState('lowercase')
  const [encoding, setEncoding] = useState('utf8')

  const generateHash = useCallback(() => {
    if (!input) {
      setOutput('')
      return
    }

    try {
      let hash = MD5(input)
      
      if (outputFormat === 'uppercase') {
        hash = hash.toUpperCase()
      }
      
      setOutput(hash)
    } catch (err) {
      setOutput(`计算失败: ${err.message}`)
    }
  }, [input, outputFormat])

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

  // 自动计算
  React.useEffect(() => {
    generateHash()
  }, [generateHash])

  return (
    <div className="space-y-6">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">输出格式:</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="lowercase">小写</option>
            <option value="uppercase">大写</option>
          </select>
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
          <button onClick={generateHash} className="btn-primary text-sm">
            计算MD5
          </button>
          <button onClick={clearAll} className="btn-secondary text-sm">
            清空
          </button>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">输入文本</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要计算MD5的文本..."
          className="textarea-field font-mono text-sm h-32"
        />
        <div className="text-xs text-gray-500">
          字符数: {input.length} | 字节数: {new Blob([input]).size}
        </div>
      </div>

      {/* 输出区域 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">MD5哈希值</h3>
          <button
            onClick={() => copyToClipboard(output)}
            className="text-sm text-primary-600 hover:text-primary-700"
            disabled={!output}
          >
            复制
          </button>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="font-mono text-sm break-all">
            {output || '哈希值将显示在这里...'}
          </div>
        </div>
        {output && (
          <div className="text-xs text-gray-500">
            长度: 32字符 (128位)
          </div>
        )}
      </div>

      {/* 使用说明 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">关于MD5</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• MD5是一种广泛使用的哈希函数，产生128位（32字符）的哈希值</li>
          <li>• 相同的输入总是产生相同的输出</li>
          <li>• 单向函数，无法从哈希值逆推原文</li>
          <li>• 常用于文件校验、密码存储等场景</li>
          <li>• 注意：MD5已不适用于安全性要求高的场景</li>
        </ul>
      </div>
    </div>
  )
}

export default Md5Hash
