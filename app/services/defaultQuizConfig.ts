import type { QuizComponent } from "~/types/quiz";


export const defaultQuizConfig: QuizComponent[] = [
  {
    id: "progress-default",
    type: "progress",
    position: { x: 0, y: 0 },
    config: {
      progressBar: {
        color: "blue",
        width: "100%",
        height: "20px",
      },
    },
  },
  {
    id: "timer-default",
    type: "timer",
    position: { x: 0, y: 1 },
    config: {
      timer: {
        minutes: 2,
        seconds: 0,
      },
    },
  },
  {
    id: "question-1",
    type: "question",
    position: { x: 0, y: 2 },
    config: {
      question: {
        total: 3,
        current: 1,
        text: "What is the capital of France?",
      },
    },
  },
  {
    id: "image-1", // Updated to match currentQuestion
    type: "image",
    position: { x: 0, y: 3 },
    config: {
      image: {
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        alt: "Paris cityscape with Eiffel Tower",
      },
    },
  },
  {
    id: "options-1",
    type: "options",
    position: { x: 0, y: 4 },
    config: {
      options: {
        items: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0,
      },
    },
  },
  {
    id: "question-2",
    type: "question",
    position: { x: 0, y: 5 },
    config: {
      question: {
        total: 3,
        current: 2,
        text: "What is the capital of India?",
      },
    },
  },
  {
    id: "options-2",
    type: "options",
    position: { x: 0, y: 6 },
    config: {
      options: {
        items: ["Uttar-Pradesh", "Gujarat", "Mumbai", "Delhi"],
        correctAnswer: 3,
      },
    },
  },
  {
    id: "question-3",
    type: "question",
    position: { x: 0, y: 7 },
    config: {
      question: {
        total: 3,
        current: 3,
        text: "What is the capital of Japan?",
      },
    },
  },
  {
    id: "options-3",
    type: "options",
    position: { x: 0, y: 8 },
    config: {
      options: {
        items: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
        correctAnswer: 1,
      },
    },
  },
];
