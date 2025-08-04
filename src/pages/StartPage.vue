<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
      <div class="text-center">
        <div class="mb-6">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">答题闯关</h1>
          <p class="text-gray-600">准备好挑战你的知识了吗？</p>
        </div>
        
        <div class="mb-8">
          <div class="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 class="font-semibold text-blue-800 mb-2">游戏规则</h3>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• 总共5道题目</li>
              <li>• 每题有4个选项</li>
              <li>• 答对得分，答错不扣分</li>
              <li>• 完成后查看成绩</li>
            </ul>
          </div>
        </div>

        <button
          @click="startQuiz"
          class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          开始答题
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

const startQuiz = () => {
  quizStore.resetQuiz()
  router.push('/quiz')
}
</script> 