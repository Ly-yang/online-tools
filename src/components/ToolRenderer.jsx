import React from 'react'

// 导入所有工具组件
import JsonFormatter from './tools/JsonFormatter'
import JsBeautify from './tools/JsBeautify'
import CssBeautify from './tools/CssBeautify'
import HtmlBeautify from './tools/HtmlBeautify'
import RegexTest from './tools/RegexTest'
import UrlEncode from './tools/UrlEncode'
import Base64Encode from './tools/Base64Encode'
import SqlFormatter from './tools/SqlFormatter'
import MarkdownEditor from './tools/MarkdownEditor'
import WordCount from './tools/WordCount'
import TextDiff from './tools/TextDiff'
import CaseConvert from './tools/CaseConvert'
import TextReplace from './tools/TextReplace'
import ImageCompress from './tools/ImageCompress'
import ImageResize from './tools/ImageResize'
import ImageFormat from './tools/ImageFormat'
import ImageBase64 from './tools/ImageBase64'
import Md5Hash from './tools/Md5Hash'
import ShaHash from './tools/ShaHash'
import AesEncrypt from './tools/AesEncrypt'
import PasswordGenerator from './tools/PasswordGenerator'
import TimestampConvert from './tools/TimestampConvert'
import NumberBase from './tools/NumberBase'
import UnitConvert from './tools/UnitConvert'
import ColorConvert from './tools/ColorConvert'
import QrGenerator from './tools/QrGenerator'
import UuidGenerator from './tools/UuidGenerator'
import LoremGenerator from './tools/LoremGenerator'
import FaviconGenerator from './tools/FaviconGenerator'
import IpLookup from './tools/IpLookup'
import UrlShortener from './tools/UrlShortener'
import WhoisLookup from './tools/WhoisLookup'
import PingTest from './tools/PingTest'

// 工具组件映射
const toolComponents = {
  JsonFormatter,
  JsBeautify,
  CssBeautify,
  HtmlBeautify,
  RegexTest,
  UrlEncode,
  Base64Encode,
  SqlFormatter,
  MarkdownEditor,
  WordCount,
  TextDiff,
  CaseConvert,
  TextReplace,
  ImageCompress,
  ImageResize,
  ImageFormat,
  ImageBase64,
  Md5Hash,
  ShaHash,
  AesEncrypt,
  PasswordGenerator,
  TimestampConvert,
  NumberBase,
  UnitConvert,
  ColorConvert,
  QrGenerator,
  UuidGenerator,
  LoremGenerator,
  FaviconGenerator,
  IpLookup,
  UrlShortener,
  WhoisLookup,
  PingTest
}

const ToolRenderer = ({ tool }) => {
  const ToolComponent = toolComponents[tool.component]
  
  if (!ToolComponent) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">工具开发中</h3>
        <p className="text-gray-500">该工具正在开发中，敬请期待！</p>
      </div>
    )
  }
  
  return (
    <div className="p-6">
      <ToolComponent />
    </div>
  )
}

export default ToolRenderer
