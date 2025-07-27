import React from 'react'
import { categoryList } from '../data/tools'

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">工具分类</h2>
        <nav className="space-y-1">
          {categoryList.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">统计信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">总工具数</span>
              <span className="font-medium text-gray-900">30+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">分类数</span>
              <span className="font-medium text-gray-900">7</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-primary-900 mb-1">开源项目</h4>
          <p className="text-xs text-primary-700 mb-2">完全免费开源，欢迎贡献代码</p>
          <a 
            href="https://github.com/your-username/online-tools" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary-600 hover:text-primary-800 underline"
          >
            查看源码 →
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
