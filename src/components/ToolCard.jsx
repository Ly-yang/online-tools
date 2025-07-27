import React from 'react'

const ToolCard = ({ tool, onClick }) => {
  return (
    <div 
      className="tool-card group"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {getCategoryName(tool.category)}
        </span>
        
        <svg 
          className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

function getCategoryName(category) {
  const names = {
    development: '开发',
    text: '文本',
    image: '图片',
    crypto: '加密',
    convert: '转换',
    generator: '生成',
    utility: '实用'
  }
  return names[category] || '其他'
}

export default ToolCard
