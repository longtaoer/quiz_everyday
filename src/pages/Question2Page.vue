<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 题目卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">{{ question.question }}</h2>
        
        <!-- 选项列表 -->
        <div class="space-y-3 mb-6">
          <button
            v-for="option in question.options"
            :key="option"
            @click="selectAnswer(option)"
            class="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md"
            :class="getOptionClass(option)"
          >
            <div class="flex items-center">
              <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center"
                   :class="getRadioClass(option)">
                <div v-if="selectedAnswer === option" 
                     class="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
              <span class="text-gray-700">{{ option }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="text-center">
        <button
          @click="submitAnswer"
          :disabled="!selectedAnswer"
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

const selectedAnswer = ref<string | null>(null)

const question = computed(() => quizStore.questions[1])

const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer
}

const getOptionClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-blue-500 bg-blue-50'
  }
  return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
}

const getRadioClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-blue-500'
  }
  return 'border-gray-300'
}

const submitAnswer = () => {
  if (selectedAnswer.value) {
    quizStore.setAnswer(1, selectedAnswer.value)
    router.push('/answer2')
  }
}
</script> 