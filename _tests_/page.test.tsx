import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '../app/page'
import { getTodos } from '@/lib/api'

// Mock the API module
jest.mock('@/lib/api')
const mockGetTodos = getTodos as jest.MockedFunction<typeof getTodos>

// Mock the 'use client' directive
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

const mockTodos = [
  {
    id: 1,
    task: 'Complete project',
    category: 'work',
    completed: false,
    createdAt: '2024-12-29T10:00:00Z'
  },
  {
    id: 2,
    task: 'Buy groceries',
    category: 'personal',
    completed: true,
    createdAt: '2024-12-29T09:00:00Z'
  }
]

describe('Todo Page', () => {
  beforeEach(() => {
    mockGetTodos.mockClear()
  })

  test('renders loading state initially', () => {
    mockGetTodos.mockImplementation(() => new Promise(() => {}))
    render(<Page />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders error state when API fails', async () => {
    mockGetTodos.mockRejectedValue(new Error('API Error'))
    render(<Page />)
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument()
    })
  })

  test('renders todos successfully', async () => {
    mockGetTodos.mockResolvedValue(mockTodos)
    render(<Page />)
    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument()
      expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    })
  })

  test('filters todos correctly', async () => {
    mockGetTodos.mockResolvedValue(mockTodos)
    render(<Page />)

    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument()
    })

    // Click work filter
    fireEvent.click(screen.getByText('WORK'))
    expect(screen.getByText('Complete project')).toBeInTheDocument()
    expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument()

    // Click personal filter
    fireEvent.click(screen.getByText('PERSONAL'))
    expect(screen.queryByText('Complete project')).not.toBeInTheDocument()
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
  })

  test('toggles todo completion', async () => {
    mockGetTodos.mockResolvedValue(mockTodos)
    render(<Page />)

    await waitFor(() => {
      expect(screen.getByText('Complete project')).toBeInTheDocument()
    })

    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
