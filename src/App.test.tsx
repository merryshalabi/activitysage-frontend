import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import App from './App'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  test('renders Activity Suggestion Generator title', () => {
    render(<App />)
    expect(screen.getByText('Activity Suggestion Generator')).toBeInTheDocument()
  })

  test('submits form and displays activity suggestions', async () => {
    // Mock API response
    const mockSuggestions = [
      { title: 'Hiking', description: 'A great outdoor activity', estimated_cost: '$20' },
      { title: 'Cooking Class', description: 'Learn to cook new recipes', estimated_cost: '$50' },
      { title: 'Movie Night', description: 'Watch a movie at home', estimated_cost: '$15' }
    ]
    mockedAxios.post.mockResolvedValueOnce({ data: { suggestions: mockSuggestions } })

    render(<App />)

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Number of People'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('Budget'), { target: { value: '$100' } })
    fireEvent.change(screen.getByLabelText('Mood'), { target: { value: 'happy' } })
    fireEvent.change(screen.getByLabelText('Environment'), { target: { value: 'outdoor' } })
    fireEvent.change(screen.getByLabelText('Duration'), { target: { value: '2 hours' } })
    fireEvent.change(screen.getByLabelText('Time of Day'), { target: { value: 'afternoon' } })
    fireEvent.change(screen.getByLabelText('Age Group'), { target: { value: 'adults' } })
    fireEvent.change(screen.getByLabelText('Interests'), { target: { value: 'nature' } })

    // Submit the form
    fireEvent.click(screen.getByText('Get Suggestions'))

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Hiking')).toBeInTheDocument()
      expect(screen.getByText('Cooking Class')).toBeInTheDocument()
      expect(screen.getByText('Movie Night')).toBeInTheDocument()
    })

    // Verify API call
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://18.134.92.79:8000/suggest',
      expect.any(FormData),
      expect.any(Object)
    )
  })

  test('displays error message on API failure', async () => {
    // Mock API error
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'))

    render(<App />)

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Number of People'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('Budget'), { target: { value: '$100' } })
    fireEvent.change(screen.getByLabelText('Mood'), { target: { value: 'happy' } })
    fireEvent.change(screen.getByLabelText('Environment'), { target: { value: 'outdoor' } })
    fireEvent.change(screen.getByLabelText('Duration'), { target: { value: '2 hours' } })
    fireEvent.change(screen.getByLabelText('Time of Day'), { target: { value: 'afternoon' } })
    fireEvent.change(screen.getByLabelText('Age Group'), { target: { value: 'adults' } })
    fireEvent.change(screen.getByLabelText('Interests'), { target: { value: 'nature' } })

    // Submit the form
    fireEvent.click(screen.getByText('Get Suggestions'))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to get activity suggestions. Please try again.')).toBeInTheDocument()
    })
  })
}) 