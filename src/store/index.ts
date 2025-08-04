import { defineStore } from 'pinia'

export interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [
      {
        question: 'Vue.js 是由谁开发的？',
        options: ['Evan You', 'Dan Abramov', 'Jordan Walke', 'Angus Croll'],
        correctAnswer: 'Evan You'
      },
      {
        question: 'Vue 3 的默认构建工具是什么？',
        options: ['Webpack', 'Vite', 'Rollup', 'Parcel'],
        correctAnswer: 'Vite'
      },
      {
        question: '在 Vue 3 中，用于响应式数据的 API 是什么？',
        options: ['ref()', 'reactive()', 'computed()', '以上都是'],
        correctAnswer: '以上都是'
      },
      {
        question: 'Vue 3 的组合式 API 中，用于生命周期钩子的是什么？',
        options: ['onMounted', 'onCreated', 'onBeforeMount', 'onAfterMount'],
        correctAnswer: 'onMounted'
      },
      {
        question: 'Tailwind CSS 是一个什么类型的框架？',
        options: ['组件库', '工具类优先的 CSS 框架', 'JavaScript 框架', '构建工具'],
        correctAnswer: '工具类优先的 CSS 框架'
      }
    ] as Question[],
    currentQuestionIndex: 0,
    answers: [] as string[],
    isFinished: false
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    score: (state) => {
      return state.answers.reduce((score, answer, index) => {
        return score + (answer === state.questions[index].correctAnswer ? 1 : 0)
      }, 0)
    },
    correctAnswers: (state) => {
      return state.answers.reduce((count, answer, index) => {
        return count + (answer === state.questions[index].correctAnswer ? 1 : 0)
      }, 0)
    }
  },

  actions: {
    setAnswer(questionIndex: number, answer: string) {
      this.answers[questionIndex] = answer
    },

    getAnswer(questionIndex: number): string | null {
      return this.answers[questionIndex] || null
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      }
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },

    finishQuiz() {
      this.isFinished = true
    },

    resetQuiz() {
      this.currentQuestionIndex = 0
      this.answers = []
      this.isFinished = false
    },

    isAnswerCorrect(questionIndex: number): boolean {
      const answer = this.answers[questionIndex]
      const question = this.questions[questionIndex]
      return answer === question.correctAnswer
    },

    isCorrectAnswer(questionIndex: number, option: string): boolean {
      const question = this.questions[questionIndex]
      return option === question.correctAnswer
    },

    isSelectedAnswer(questionIndex: number, option: string): boolean {
      const answer = this.answers[questionIndex]
      return answer === option
    }
  }
}) 