<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-6xl mx-auto w-full">
      <!-- 题目卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">{{ question.question }}</h2>
        
        <!-- 连线题区域 -->
        <div class="flex gap-8 justify-center">
          <!-- 左侧图片列 -->
          <div class="space-y-4">
            <div 
              v-for="(image, index) in images" 
              :key="`image-${index}`"
              @click="selectImage(index)"
              class="cursor-pointer transition-all duration-200"
              :class="getImageClass(index)"
            >
              <div class="bg-transparent h-24 rounded-lg p-0 text-center border-2"
                   :class="getImageBorderClass(index)">
                <div class="w-24 h-24 rounded-lg mx-auto mb-0 flex items-center justify-center"
                     :class="image.color">
                  <span class="font-semibold h-12" :class="image.textColor">{{ image.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧选项列 -->
          <div class="space-y-4">
            <div 
              v-for="(option, index) in question.options" 
              :key="`option-${index}`"
              @click="selectOption(option)"
              class="cursor-pointer transition-all duration-200"
              :class="getOptionClass(option)"
            >
              <div class="bg-gray-100 w-72 h-24 rounded-lg p-4 text-center border-2 flex items-center justify-center"
                   :class="getOptionBorderClass(option)">
                <p class="text-gray-700 font-medium">{{ option }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 连线显示 -->
        <div v-if="currentConnection" class="mt-6 text-center">
          <div class="inline-block p-3 rounded-lg" :class="connectionClass">
            <span class="font-semibold">{{ connectionText }}</span>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="text-center">
        <button
          @click="submitAnswer"
          :disabled="!isAllConnected"
          class="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          提交答案
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

// 连线题状态
const selectedImage = ref<number | null>(null)
const selectedOption = ref<string | null>(null)
const connections = ref<Map<number, string>>(new Map())
const usedOptions = ref<Set<string>>(new Set())
const usedImages = ref<Set<number>>(new Set())

const question = computed(() => quizStore.questions[1])

// 图片数据
const images = ref([
  { label: '图1', name: '设计元素A', color: 'bg-blue-200', textColor: 'text-blue-600' },
  { label: '图2', name: '设计元素B', color: 'bg-green-200', textColor: 'text-green-600' },
  { label: '图3', name: '设计元素C', color: 'bg-yellow-200', textColor: 'text-yellow-600' },
  { label: '图4', name: '设计元素D', color: 'bg-purple-200', textColor: 'text-purple-600' }
])

// 正确答案映射
const correctAnswers = {
  0: '简约性',
  1: '一致性', 
  2: '层次性',
  3: '可访问性'
}

const selectImage = (imageIndex: number) => {
  if (usedImages.value.has(imageIndex)) return
  
  if (selectedImage.value === imageIndex) {
    selectedImage.value = null
  } else {
    selectedImage.value = imageIndex
    checkConnection()
  }
}

const selectOption = (option: string) => {
  if (usedOptions.value.has(option)) return
  
  if (selectedOption.value === option) {
    selectedOption.value = null
  } else {
    selectedOption.value = option
    checkConnection()
  }
}

const checkConnection = () => {
  if (selectedImage.value !== null && selectedOption.value !== null) {
    const imageIndex = selectedImage.value
    const option = selectedOption.value
    
    // 建立连接
    connections.value.set(imageIndex, option)
    usedImages.value.add(imageIndex)
    usedOptions.value.add(option)
    
    // 检查是否正确
    const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
    
    // 显示反馈
    setTimeout(() => {
      if (isCorrect) {
        // 正确连接保持
      } else {
        // 错误连接移除
        connections.value.delete(imageIndex)
        usedImages.value.delete(imageIndex)
        usedOptions.value.delete(option)
      }
      selectedImage.value = null
      selectedOption.value = null
    }, 1000)
  }
}

const getImageClass = (index: number) => {
  if (selectedImage.value === index) {
    return 'scale-105'
  }
  if (usedImages.value.has(index)) {
    return 'opacity-50'
  }
  return 'hover:scale-105'
}

const getImageBorderClass = (index: number) => {
  if (selectedImage.value === index) {
    return 'border-2 border-blue-500'
  }
  if (usedImages.value.has(index)) {
    const option = connections.value.get(index)
    const isCorrect = correctAnswers[index as keyof typeof correctAnswers] === option
    return isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500'
  }
  return 'border-2 border-gray-300'
}

const getOptionClass = (option: string) => {
  if (selectedOption.value === option) {
    return 'scale-105'
  }
  if (usedOptions.value.has(option)) {
    return 'opacity-50'
  }
  return 'hover:scale-105'
}

const getOptionBorderClass = (option: string) => {
  if (selectedOption.value === option) {
    return 'border-blue-500'
  }
  if (usedOptions.value.has(option)) {
    // 检查这个选项是否连接正确
    for (const [imageIndex, connectedOption] of connections.value.entries()) {
      if (connectedOption === option) {
        const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
        return isCorrect ? 'border-green-500' : 'border-red-500'
      }
    }
  }
  return 'border-gray-300'
}

const currentConnection = computed(() => {
  return selectedImage.value !== null && selectedOption.value !== null
})

const connectionText = computed(() => {
  if (!currentConnection.value) return ''
  const imageIndex = selectedImage.value!
  const option = selectedOption.value!
  const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
  return isCorrect ? '✓ 连接正确！' : '✗ 连接错误'
})

const connectionClass = computed(() => {
  if (!currentConnection.value) return ''
  const imageIndex = selectedImage.value!
  const option = selectedOption.value!
  const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
  return isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})

const isAllConnected = computed(() => {
  return connections.value.size === 4
})

const submitAnswer = () => {
  if (isAllConnected.value) {
    // 计算最终答案（选择一致性作为答案）
    quizStore.setAnswer(1, '一致性')
    router.push('/answer2')
  }
}
</script> 