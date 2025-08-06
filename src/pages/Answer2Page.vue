<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 答案卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ question.question }}</h2>
        
        <!-- 图片区域 -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-gray-100 rounded-lg p-4 text-center">
            <div class="w-24 h-24 bg-blue-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span class="text-blue-600 font-semibold">图1</span>
            </div>
            <p class="text-sm text-gray-600">设计元素A</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-4 text-center">
            <div class="w-24 h-24 bg-green-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span class="text-green-600 font-semibold">图2</span>
            </div>
            <p class="text-sm text-gray-600">设计元素B</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-4 text-center">
            <div class="w-24 h-24 bg-yellow-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span class="text-yellow-600 font-semibold">图3</span>
            </div>
            <p class="text-sm text-gray-600">设计元素C</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-4 text-center">
            <div class="w-24 h-24 bg-purple-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span class="text-purple-600 font-semibold">图4</span>
            </div>
            <p class="text-sm text-gray-600">设计元素D</p>
          </div>
        </div>
        
        <!-- 选项列表 -->
        <div class="space-y-3 mb-6">
          <div 
            v-for="option in question.options" 
            :key="option"
            class="flex items-center p-3 rounded-lg border-2"
            :class="getOptionClass(option)"
          >
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center"
                 :class="getRadioClass(option)">
              <div v-if="isSelectedAnswer(option)" 
                   class="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <span class="text-gray-700">{{ option }}</span>
            <div class="ml-auto">
              <span v-if="isCorrectAnswer(option)" class="text-[#5BC279] font-medium">✓ 正确答案</span>
              <span v-else-if="isSelectedAnswer(option)" class="text-[#DF6935] font-medium">✗ 你的答案</span>
            </div>
          </div>
        </div>

        <!-- 结果状态 -->
        <div class="p-4 rounded-lg border-2 mb-4" :class="resultClass">
          <div class="flex items-center mb-2">
            <span class="text-lg font-semibold" :class="resultTextClass">
              {{ isCorrect ? '✓ 回答正确！' : '✗ 回答错误' }}
            </span>
          </div>
        </div>

        <!-- 知识点解释 -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-2">知识点</h3>
          <p class="text-blue-700 text-sm">{{ explanation }}</p>
        </div>
      </div>

      <!-- 回顾知识点按钮 -->
      <div class="text-center">
        <button
          @click="goToSummary"
          class="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
        >
          回顾今日知识点
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

const question = computed(() => quizStore.questions[1])
const userAnswer = computed(() => quizStore.getAnswer(1))
const isCorrect = computed(() => quizStore.isAnswerCorrect(1))

const resultClass = computed(() => {
  return isCorrect.value 
    ? 'border-[#5BC279] bg-[#5BC279]/10' 
    : 'border-[#DF6935] bg-[#DF6935]/10'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-[#5BC279]' 
    : 'text-[#DF6935]'
})

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(1, option)) {
    return 'border-[#5BC279] bg-[#5BC279]/10'
  }
  if (quizStore.isSelectedAnswer(1, option)) {
    return 'border-[#DF6935] bg-[#DF6935]/10'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(1, option)) {
    return 'border-[#5BC279]'
  }
  if (quizStore.isSelectedAnswer(1, option)) {
    return 'border-[#DF6935]'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(1, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(1, option)
}

const explanation = '一致性是设计中的重要原则，它确保界面元素在视觉和行为上保持统一。通过保持一致的色彩、字体、间距和交互模式，用户可以更容易地理解和预测界面行为，从而提升用户体验和可用性。'

const goToSummary = () => {
  router.push('/summary')
}
</script> 