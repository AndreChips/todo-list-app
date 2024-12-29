import { Todo } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(API_URL!, {
      headers: {
        'x-api-key': API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}