import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/app/page'
import { getTodos } from '@/lib/api'

jest.mock('@/lib/api', () => ({
  getTodos: jest.fn()
}))

const mockTodos = [
  {
    id: 1,
    task: 'Buy groceries',
    category: 'personal',
    completed: false,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 2,
    task: 'Prepare meeting notes',
    category: 'work',
    completed: true,
    createdAt: '2024-11-30T14:00:00Z'
  }
]

describe('Todo Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', async () => {
    ;(getTodos as jest.Mock).mockResolvedValueOnce(mockTodos)

    render(<Home />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })

  it('displays an error message if fetching todos fails', async () => {
    ;(getTodos as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch todos')
    )

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument()
    })
  })

  it('filters todos by category', async () => {
    ;(getTodos as jest.Mock).mockResolvedValueOnce(mockTodos)

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Buy groceries')).toBeInTheDocument()
      expect(screen.getByText('Prepare meeting notes')).toBeInTheDocument()
    })

    const workFilterButton = screen.getByRole('button', { name: /work/i })
    fireEvent.click(workFilterButton)

    await waitFor(() => {
      expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument()
      expect(screen.getByText('Prepare meeting notes')).toBeInTheDocument()
    })
  })

  it('shows all todos when "ALL" filter is selected', async () => {
    ;(getTodos as jest.Mock).mockResolvedValueOnce(mockTodos)

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Buy groceries')).toBeInTheDocument()
      expect(screen.getByText('Prepare meeting notes')).toBeInTheDocument()
    })

    const allFilterButton = screen.getByRole('button', { name: /all/i })
    fireEvent.click(allFilterButton)

    await waitFor(() => {
      expect(screen.getByText('Buy groceries')).toBeInTheDocument()
      expect(screen.getByText('Prepare meeting notes')).toBeInTheDocument()
    })
  })
})
