import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('studentpath_token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      api.get('/api/v1/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('studentpath_token')
          delete api.defaults.headers.common['Authorization']
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)
    const res = await api.post('/api/v1/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    localStorage.setItem('studentpath_token', res.data.access_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
    setUser(res.data.user)
    return res.data
  }

  const register = async (data) => {
    const res = await api.post('/api/v1/auth/register', data)
    localStorage.setItem('studentpath_token', res.data.access_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
    setUser(res.data.user)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('studentpath_token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
