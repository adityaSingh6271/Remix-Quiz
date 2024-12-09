import fs from 'node:fs';
import path from 'node:path';
import type { QuizComponent } from "~/types/quiz";

const STORAGE_FILE = path.join(process.cwd(), 'quiz-components.json');

export function getStoredComponents(): QuizComponent[] {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading components:', error);
  }
  return [];
}

export function saveComponents(components: QuizComponent[]): void {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(components, null, 2));
  } catch (error) {
    console.error('Error saving components:', error);
  }
}