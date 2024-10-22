import React, { useState, useEffect } from 'react'
import request from 'superagent'
import { useNavigate } from 'react-router-dom'
import { useCardMutations } from '../hooks/useCardMutations'
import { useMemoirMutation } from '../hooks/useMemoirMutation'
import { useThemesMutation } from '../hooks/useThemeMutation'
import { useHabitMutation } from '../hooks/useHabitMutation'
import {
  DEFAULT_MEMOIRS,
  DEFAULT_THEMES,
  DEFAULT_WEEKLY_TASKS,
  DEFAULT_DAILY_TASKS,
  DEFAULT_MONTHLY_TASKS,
  DEFAULT_YEARLY_TASKS,
  DEFAULT_LIFELY_TASKS,
  DEFAULT_HABITS,
} from '../../server/db/defaultData'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [display, setDisplay] = useState('signUp')
  const [loggedUsername, setLoggedUsername] = useState<string | null>(null)

  const navigate = useNavigate()
  const memoirMutation = useMemoirMutation()
  const dailyTaskMutation = useCardMutations('daily')
  const weeklyTaskMutation = useCardMutations('weekly')
  const monthlyTaskMutation = useCardMutations('monthly')
  const yearlyTaskMutation = useCardMutations('yearly')
  const lifelyTaskMutation = useCardMutations('lifely')
  const themeMutation = useThemesMutation()
  const habitMutation = useHabitMutation()

  const [signupError, setSignupError] = useState<string | null>(null)

  // Load logged username from local storage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('loggedUsername')
    if (savedUsername) {
      setLoggedUsername(savedUsername)
      console.log('You are logged in as: ' + savedUsername)
    }
  }, [])

  useEffect(() => {
    const loggedUsername = localStorage.getItem('loggedUsername')
    if (loggedUsername) {
      navigate('/')
    }
  }, [navigate])

  console.log('this is a random log you are:' + loggedUsername)

  // Sign Up Functions
  const handleNewUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewUsername(event.target.value)
  }

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPassword(event.target.value)
  }

  const handleSignupSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const userDetails = { username: newUsername, password: newPassword }

    try {
      const response = await request.post('/api/users/signUp').send(userDetails)

      if (response.ok) {
        const loggedUser = response.body.username
        console.log('Logged user:', loggedUser)
        setLoggedUsername(loggedUser)
        localStorage.setItem('loggedUsername', loggedUser)
        setNewUsername('')
        setNewPassword('')
        await Promise.all([
          // Save memoirs
          ...DEFAULT_MEMOIRS.map((memoir) =>
            memoirMutation.mutateAsync({ ...memoir, username: loggedUser }),
          ),

          // Save themes
          ...DEFAULT_THEMES.map((theme) =>
            themeMutation.mutateAsync({ ...theme, username: loggedUser }),
          ),

          // Save habits
          ...DEFAULT_HABITS.map((habit) =>
            habitMutation.mutateAsync({ ...habit, username: loggedUser }),
          ),

          // Save daily tasks
          ...DEFAULT_DAILY_TASKS.map((task) =>
            dailyTaskMutation.mutateAsync({ ...task, username: loggedUser }),
          ),

          // Save weekly tasks
          ...DEFAULT_WEEKLY_TASKS.map((task) =>
            weeklyTaskMutation.mutateAsync({ ...task, username: loggedUser }),
          ),

          // Save monthly tasks
          ...DEFAULT_MONTHLY_TASKS.map((task) =>
            monthlyTaskMutation.mutateAsync({ ...task, username: loggedUser }),
          ),

          // Save yearly tasks
          ...DEFAULT_YEARLY_TASKS.map((task) =>
            yearlyTaskMutation.mutateAsync({ ...task, username: loggedUser }),
          ),

          // Save lifely tasks
          ...DEFAULT_LIFELY_TASKS.map((task) =>
            lifelyTaskMutation.mutateAsync({ ...task, username: loggedUser }),
          ),
        ])
        navigate('/')
      } else {
        console.error('Error creating user:', response)
      }
    } catch (error) {
      const err = error as { status: number; message: string }

      if (err.status === 409) {
        console.error('Username already taken.')
        setSignupError('Username already taken')
      } else {
        console.error('Error during signup:', err.message)
      }
    }
  }

  // Login Functions
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userDetails = { username, password }

    try {
      const response = await request.post('/api/users/login').send(userDetails)

      if (response.ok) {
        const loggedUser = response.body.username
        console.log('Logged user:', loggedUser)
        setLoggedUsername(loggedUser)
        localStorage.setItem('loggedUsername', loggedUser)
        setUsername('')
        setPassword('')

        navigate('/')
      }
    } catch (error) {
      if (error) {
        setSignupError('Incorrect username or password')
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-box1">
        <button className="begin-box">
          <h1 className="begin-title">
            {display === 'signUp' ? 'SignUp to' : 'Login to'} <br />
            <span className="login-header">TimeJump ✦</span>
          </h1>
        </button>
        <img
          src="https://w.wallhaven.cc/full/d6/wallhaven-d6y12l.jpg"
          alt="time jump"
          className="login-img"
        />
      </div>

      <div className="login-box2">
        <div className="login-box">
          <p className="login-text">
            {display === 'signUp' ? 'Create Account' : 'Welcome Back!'}
          </p>

          <form
            className="login-form"
            onSubmit={
              display === 'signUp' ? handleSignupSubmit : handleLoginSubmit
            }
          >
            <div className="login-input-box">
              <input
                type="text"
                value={display === 'signUp' ? newUsername : username}
                placeholder="Username"
                onChange={
                  display === 'signUp'
                    ? handleNewUsernameChange
                    : handleUsernameChange
                }
                className="username-input"
              />
              <input
                type="password"
                value={display === 'signUp' ? newPassword : password}
                placeholder="Password"
                onChange={
                  display === 'signUp'
                    ? handleNewPasswordChange
                    : handlePasswordChange
                }
                className="password-input"
              />
            </div>

            <div className="login-buttons-container">
              <button type="submit" className="submit-btn">
                {display === 'signUp' ? 'Sign Up' : 'Login'}
              </button>
              <button
                type="button"
                className={display === 'signUp' ? 'signup-btn' : 'login-btn'}
                onClick={() =>
                  setDisplay(display === 'signUp' ? 'login' : 'signUp')
                }
              >
                {display === 'signUp'
                  ? 'I already have an account'
                  : 'Create a new account'}
              </button>
            </div>
          </form>

          {signupError && <p className="error-message">{signupError}</p>}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
