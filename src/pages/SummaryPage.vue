<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-4xl mx-auto w-full">
      <!-- 成绩概览 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">今日学习完成！</h1>
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
          <div class="text-center text-white">
            <div class="text-3xl font-bold">{{ score }}</div>
            <div class="text-sm">分</div>
          </div>
        </div>
        <div class="text-lg text-gray-600">
          答对了 {{ correctAnswers }} 题，共 {{ totalQuestions }} 题
        </div>
        <div class="mt-2">
          <span class="text-2xl font-bold" :class="scoreColor">{{ scorePercentage }}%</span>
        </div>
      </div>

      <!-- 知识点总结 -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">今日知识点总结</h2>
        
        <div class="space-y-6">
          <div 
            v-for="(question, index) in questions" 
            :key="index"
            class="border rounded-lg p-6"
            :class="getQuestionClass(index)"
          >
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">第 {{ index + 1 }} 题</h3>
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="getAnswerClass(index)"
              >
                {{ getAnswerStatus(index) }}
              </span>
            </div>
            
            <p class="text-gray-700 mb-4">{{ question.question }}</p>
            
            <div class="space-y-2 mb-4">
              <div 
                v-for="option in question.options" 
                :key="option"
                class="flex items-center p-2 rounded"
                :class="getOptionClass(index, option)"
              >
                <span class="mr-2">{{ option }}</span>
                <span v-if="isCorrectAnswer(index, option)" class="text-green-600 font-medium">✓ 正确答案</span>
                <span v-else-if="isSelectedAnswer(index, option)" class="text-red-600 font-medium">✗ 你的答案</span>
              </div>
            </div>

            <!-- 知识点解释 -->
            <div class="bg-blue-50 rounded-lg p-4">
              <h4 class="font-semibold text-blue-800 mb-2">知识点</h4>
              <p class="text-blue-700 text-sm">{{ getExplanation(index) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-center space-x-4 mt-8">
        <button
          @click="restartQuiz"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          重新开始
        </button>
        <button
          @click="goHome"
          class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          返回首页
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

const score = computed(() => quizStore.score)
const correctAnswers = computed(() => quizStore.correctAnswers)
const totalQuestions = computed(() => quizStore.questions.length)
const questions = computed(() => quizStore.questions)

const scorePercentage = computed(() => {
  return Math.round((score.value / totalQuestions.value) * 100)
})

const scoreColor = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 60) return 'text-yellow-600'
  return 'text-red-600'
})

const getQuestionClass = (index: number) => {
  const isCorrect = quizStore.isAnswerCorrect(index)
  return isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
}

const getAnswerClass = (index: number) => {
  const isCorrect = quizStore.isAnswerCorrect(index)
  return isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}

const getAnswerStatus = (index: number) => {
  return quizStore.isAnswerCorrect(index) ? '正确' : '错误'
}

const getOptionClass = (index: number, option: string) => {
  const isCorrect = quizStore.isCorrectAnswer(index, option)
  const isSelected = quizStore.isSelectedAnswer(index, option)
  
  if (isCorrect) return 'bg-green-100 border-green-300'
  if (isSelected && !isCorrect) return 'bg-red-100 border-red-300'
  return 'bg-gray-50'
}

const isCorrectAnswer = (index: number, option: string) => {
  return quizStore.isCorrectAnswer(index, option)
}

const isSelectedAnswer = (index: number, option: string) => {
  return quizStore.isSelectedAnswer(index, option)
}

const getExplanation = (index: number) => {
  const explanations = [
    '现代简约风格强调简洁、清晰的设计原则。黑白灰作为基础色调，搭配蓝色作为点缀，既保持了简约感，又增加了视觉层次。这种配色方案在UI设计中广泛应用，能够提供良好的可读性和用户体验。',
    '在用户体验设计中，可用性是最重要的原则。无论设计多么美观或创新，如果用户无法轻松完成任务，设计就是失败的。可用性确保产品能够满足用户的基本需求，提供直观、高效的使用体验。'
  ]
  return explanations[index] || '暂无知识点解释'
}

const restartQuiz = () => {
  quizStore.resetQuiz()
  router.push('/')
}

const goHome = () => {
  router.push('/')
}
</script> 