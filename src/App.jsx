import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ToolCard from './components/ToolCard'
import ToolModal from './components/ToolModal'
import { toolCategories } from './data/tools'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTool, setSelectedTool] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 获取所有工具
  const allTools = Object.values(toolCategories).flat()
  
  // 过滤工具
  const filteredTools = selectedCategory === 'all' 
    ? allTools 
    : toolCategories[selectedCategory] || []
  
  const searchedTools = filteredTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToolClick = (tool) => {
    setSelectedTool(tool)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTool(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all' ? '所有工具' : getCategoryName(selectedCategory)}
              </h2>
              <p className="text-gray-600">
                找到 {searchedTools.length} 个工具
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => handleToolClick(tool)}
                />
              ))}
            </div>
            
            {searchedTools.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  未找到相关工具
                </h3>
                <p className="text-gray-500">
                  请尝试其他关键词或选择不同的分类
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {isModalOpen && selectedTool && (
        <ToolModal 
          tool={selectedTool}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

function getCategoryName(category) {
  const names = {
    development: '开发工具',
    text: '文本工具',
    image: '图片工具',
    crypto: '加密解密',
    convert: '转换工具',
    generator: '生成工具',
    utility: '实用工具'
  }
  return names[category] || '未知分类'
}

export default App
