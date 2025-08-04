<template>
  <div class="bg-white rounded-2xl shadow-xl p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ question.question }}</h2>
    </div>

    <div class="space-y-3">
      <button
        v-for="option in question.options"
        :key="option"
        @click="$emit('select-answer', option)"
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
</template>

<script setup lang="ts">
interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

interface Props {
  question: Question
  selectedAnswer: string | null
}

const props = defineProps<Props>()
defineEmits<{
  'select-answer': [answer: string]
}>()

const getOptionClass = (option: string) => {
  if (option === props.selectedAnswer) {
    return 'border-blue-500 bg-blue-50'
  }
  return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
}

const getRadioClass = (option: string) => {
  if (option === props.selectedAnswer) {
    return 'border-blue-500'
  }
  return 'border-gray-300'
}
</script> 