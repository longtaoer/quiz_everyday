<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- 成绩概览 -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">答题完成！</h1>
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

        <!-- 答题详情 -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">答题详情</h2>
          <div class="space-y-4">
            <div 
              v-for="(question, index) in questions" 
              :key="index"
              class="border rounded-lg p-4"
              :class="getQuestionClass(index)"
            >
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-gray-800">第 {{ index + 1 }} 题</h3>
                <span 
                  class="px-2 py-1 rounded text-sm font-medium"
                  :class="getAnswerClass(index)"
                >
                  {{ getAnswerStatus(index) }}
                </span>
              </div>
              <p class="text-gray-700 mb-3">{{ question.question }}</p>
              <div class="space-y-2">
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
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-center space-x-4">
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
const answers = computed(() => quizStore.answers)

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

const restartQuiz = () => {
  quizStore.resetQuiz()
  router.push('/quiz')
}

const goHome = () => {
  router.push('/')
}
</script> 