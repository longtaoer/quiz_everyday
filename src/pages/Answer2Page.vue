<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 答案卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ question.question }}</h2>
        
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
              <span v-if="isCorrectAnswer(option)" class="text-green-600 font-medium">✓ 正确答案</span>
              <span v-else-if="isSelectedAnswer(option)" class="text-red-600 font-medium">✗ 你的答案</span>
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
    ? 'border-green-200 bg-green-50' 
    : 'border-red-200 bg-red-50'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-green-700' 
    : 'text-red-700'
})

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(1, option)) {
    return 'border-green-300 bg-green-50'
  }
  if (quizStore.isSelectedAnswer(1, option)) {
    return 'border-red-300 bg-red-50'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(1, option)) {
    return 'border-green-500'
  }
  if (quizStore.isSelectedAnswer(1, option)) {
    return 'border-red-500'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(1, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(1, option)
}

const explanation = '在用户体验设计中，可用性是最重要的原则。无论设计多么美观或创新，如果用户无法轻松完成任务，设计就是失败的。可用性确保产品能够满足用户的基本需求，提供直观、高效的使用体验。'

const goToSummary = () => {
  router.push('/summary')
}
</script> 