'use client'

import { useEffect, useState, useMemo } from 'react'
import { Todo } from '@/types/todo'
import { getTodos } from '@/lib/api'

const FILTER_OPTIONS = ['ALL', 'PERSONAL', 'WORK'] as const
type FilterOption = (typeof FILTER_OPTIONS)[number]

export default function TodoList() {
  const [filter, setFilter] = useState<FilterOption>('ALL')
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true)
        const data = await getTodos()
        setTodos(data)
      } catch (err) {
        setError('Failed to fetch todos')
        console.error('Error fetching todos:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const sortedAndFilteredTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (filter === 'ALL') return true
      return todo.category.toUpperCase() === filter
    })

    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [todos, filter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white overflow-hidden shadow-lg">
        <div className="bg-[#281E9B] p-6">
          <h1 className="text-white text-2xl font-semibold">To Do</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto overflow-hidden">
        <div className="p-6">
          <div className="flex gap-2 mb-6 items-center">
            <span className="font-semibold text-sm text-gray-500">Filter:</span>
            <div className="flex gap-2">
              {FILTER_OPTIONS.map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors
                    ${
                      filter === filterOption
                        ? 'bg-[#D2E3DF] text-[#004736]'
                        : 'bg-[#E8E2E2] text-[#4D4D52] hover:bg-[#D2E3DF]'
                    }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {sortedAndFilteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`p-2 md:p-4 flex items-center justify-between py-3 border-b border-gray-100 last:border-0 transition-all duration-200 ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#4338CA] focus:ring-[#4338CA]"
                  />
                  <div>
                    <p
                      className={`font-semibold transition-all duration-200 ${
                        todo.completed
                          ? 'text-gray-400 line-through'
                          : 'text-black'
                      }`}
                    >
                      {todo.task}
                    </p>
                    <p className="text-sm text-black">
                      {todo.category.charAt(0).toUpperCase() +
                        todo.category.slice(1)}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-black">
                  {new Date(todo.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
