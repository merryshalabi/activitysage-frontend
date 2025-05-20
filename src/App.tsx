import { useState } from 'react'
import axios from 'axios'
import './App.css'

interface Activity {
  title: string
  description: string
  estimated_cost: string
}

interface ApiResponse {
  suggestions: Activity[]
  response_time: string
}

function App() {
  const [formData, setFormData] = useState({
    people: '',
    budget: '',
    mood: '',
    environment: '',
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [responseTime, setResponseTime] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponseTime('')

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      const response = await axios.post<ApiResponse>('http://10.0.2.110:8000/suggest', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setActivities(response.data.suggestions)
      setResponseTime(response.data.response_time)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError('Failed to get activity suggestions. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="container">
      <h1>Activity Suggestion Generator</h1>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="people">Number of People</label>
            <input
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              placeholder="e.g., 4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., $100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mood">Mood</label>
            <input
              id="mood"
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              placeholder="e.g., energetic"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="environment">Environment</label>
            <input
              id="environment"
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              placeholder="indoor or outdoor"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Suggestions'}
          </button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {activities.length > 0 && (
        <div className="activities">
          <h2>Suggested Activities</h2>
          <div className="activity-list">
            {activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p className="cost">Estimated Cost: {activity.estimated_cost}</p>
              </div>
            ))}
          </div>
          {responseTime && (
            <p className="response-time">Responded in {responseTime}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
