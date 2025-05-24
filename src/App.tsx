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
    duration: '',
    time_of_day: '',
    age_group: '',
    interests: '',
    accessibility_needs: '',
    weather: ''
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestionTime, setSuggestionTime] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuggestionTime(null)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      const response = await axios.post<ApiResponse>('http://18.134.92.79:8000/suggest', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setActivities(response.data.suggestions)
      setSuggestionTime(new Date().toLocaleString())
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

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2 hours"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time_of_day">Time of Day</label>
            <input
              id="time_of_day"
              name="time_of_day"
              value={formData.time_of_day}
              onChange={handleChange}
              placeholder="e.g., morning, afternoon, evening"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age_group">Age Group</label>
            <input
              id="age_group"
              name="age_group"
              value={formData.age_group}
              onChange={handleChange}
              placeholder="e.g., adults, children, all ages"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interests">Interests</label>
            <input
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g., sports, arts, food, nature"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="accessibility_needs">Accessibility Needs</label>
            <input
              id="accessibility_needs"
              name="accessibility_needs"
              value={formData.accessibility_needs}
              onChange={handleChange}
              placeholder="e.g., wheelchair accessible, no stairs"
            />
          </div>

          <div className="form-group">
            <label htmlFor="weather">Weather</label>
            <input
              id="weather"
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              placeholder="e.g., sunny, rainy, snowy"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Suggestions'}
          </button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {activities.length > 0 && (
        <>
          <h2 className="suggestions-title">Suggested Activities</h2>
          <div className="suggestions-container">
            <div className="activities-grid">
              {activities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <h3><span className="activity-title-emoji">✨</span>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <div className="cost-tag">
                    <span className="cost-emoji">💰</span>
                    <span className="cost-text">Estimated Cost: <b>{activity.estimated_cost}</b></span>
                  </div>
                </div>
              ))}
            </div>
            {suggestionTime && (
              <p className="response-time">Suggested on {suggestionTime}</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}


export default App



