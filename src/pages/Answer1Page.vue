<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 答案卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <img src="/images/question1.svg" alt="Question 1" class="w-auto h-20 mb-6">
        <!-- 选项列表 -->
        <div class="space-y-3 mb-6">
          <div 
            v-for="option in question.options" 
            :key="option"
            class="flex items-center p-4 rounded-lg border-2"
            :class="getOptionClass(option)"
          >
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center"
                 :class="getRadioClass(option)">
              <div v-if="isSelectedAnswer(option)" 
                   :class="isCorrectAnswer(option) ? 'w-3 h-3 rounded-full bg-[#5BC279]' : 'w-3 h-3 rounded-full bg-[#DF6935]'"></div>
            </div>
            <span class="text-gray-700">{{ option }}</span>
            <div class="ml-auto">
              <span v-if="isCorrectAnswer(option)" class="text-[#5BC279] font-medium">✓ 正确答案</span>
              <span v-else-if="isSelectedAnswer(option)" class="text-[#DF6935] font-medium">✗ 你的答案</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 底部信息区域 - 撑满屏幕宽度 -->
    <div class="h-32 fixed bottom-0 left-0 right-0 p-4 " :class="bottomInfoClass">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-start gap-12">
           <!-- 知识点解释 -->
          <div class="flex-1 flex items-start gap-3">
            <!-- 结果图片 -->
            <img 
              v-if="isCorrect"
              src="/images/rightresult.svg" 
              alt="回答正确"
              class="w-16 h-16 flex-shrink-0 mr-2"
            />
            <img 
              v-else
              src="/images/wrongresult.svg" 
              alt="回答错误"
              class="w-16 h-16 flex-shrink-0 mr-2"
            />
            
            <!-- 文字内容 -->
            <div class="flex-1">
              <span class="text-lg font-semibold mb-4" :class="resultTextClass">
                {{ isCorrect ? '你太棒啦！' : `再接再厉！` }}
              </span>
              <p class="text-gray-500 text-sm mt-2">
                <span class="font-semibold">知识点：</span>{{ explanation }}
              </p>
            </div>
          </div>

          <!-- 挑战下一题按钮 -->
          <div class="flex-shrink-0 items-center h-full mt-8">
            <button
              @click="nextQuestion"
              class="px-8 py-3 font-semibold rounded-full transition-colors"
              :class="buttonClass"
            >
              挑战下一题
            </button>
          </div>
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

const question = computed(() => quizStore.questions[0])
const userAnswer = computed(() => quizStore.getAnswer(0))
const isCorrect = computed(() => quizStore.isAnswerCorrect(0))

const resultClass = computed(() => {
  return isCorrect.value 
    ? 'border-[#5BC279] bg-[#FCFFFD]' 
    : 'border-[#DF6935] bg-[#FFFCFC]'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-[#4AB832]' 
    : 'text-[#DF6935]'
})

const bottomInfoClass = computed(() => {
  return isCorrect.value 
    ? 'bg-[#E0F7C8]' 
    : 'bg-[#FAE0E0]'
})

const buttonClass = computed(() => {
  return isCorrect.value 
    ? 'bg-[#6EC25B] text-white hover:bg-[#5DB24A]' 
    : 'bg-[#DB5D26] text-white hover:bg-[#CA4C15]'
})

const imageSrc = computed(() => {
  return isCorrect.value 
    ? '/images/rightresult.svg'
    : '/images/wrongresult.svg'
})

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(0, option)) {
    return 'border-[#5BC279] bg-[#FCFFFD]'
  }
  if (quizStore.isSelectedAnswer(0, option)) {
    return 'border-[#DF6935] bg-[#FFFCFC]'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(0, option)) {
    return 'border-[#5BC279]'
  }
  if (quizStore.isSelectedAnswer(0, option)) {
    return 'border-[#DF6935]'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(0, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(0, option)
}

const explanation = '有些设计师会认为按钮可以根据内容来调整大小，但这可能导致触摸困难，尤其在小屏设备上。标准的 44px 是为了提高可用性。'

const nextQuestion = () => {
  router.push('/question2')
}
</script> 