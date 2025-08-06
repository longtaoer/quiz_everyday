<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 题目卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <img src="/images/question1.svg" alt="Question 1" class="w-auto h-20 mb-6">
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
                     class="w-3 h-3 rounded-full bg-black"></div>
              </div>
              <span class="text-gray-700">{{ option }}</span>
            </div>
          </button>
        </div>
      </div>
<!-- 底部信息区域 - 撑满屏幕宽度 -->
<div class="h-32 fixed bottom-0 left-0 right-0 p-4 bg-transparent">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-start gap-12">
          <!-- 知识点解释 -->
          <div class="flex-1 flex items-start gap-3">
            <!-- 文字内容 -->
            <div class="flex-1 text-transparent">
              <span class="text-lg font-semibold mb-4">你太棒啦！</span>
            </div>
          </div>
          <!-- 提交按钮 -->
      <div class="text-right ml-0 mr-0">
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

const question = computed(() => quizStore.questions[0])

const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer
}

const getOptionClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-black bg-gray-50'
  }
  return 'border-gray-200 hover:border-black hover:bg-gray-50'
}

const getRadioClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-black'
  }
  return 'border-gray-300'
}

const submitAnswer = () => {
  if (selectedAnswer.value) {
    quizStore.setAnswer(0, selectedAnswer.value)
    router.push('/answer1')
  }
}
</script> 