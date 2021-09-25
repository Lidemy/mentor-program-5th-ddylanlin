/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-property-newline */

import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import PostPage from '../../pages/PostPage'
import NewPostPage from '../../pages/NewPostPage'
import AboutPage from '../../pages/AboutPage'
import UploadPostPage from '../../pages/UploadPostPage'
import { AuthContext } from '../../contexts'
import { getAuthToken } from '../../utils'
import { getMe } from '../../WebAPI'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (getAuthToken() !== '') {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data)
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }} >
    <Router >
      <Header />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path="/post/:id">
            <PostPage />
          </Route>
        <Route path="/new-post">
          <NewPostPage />
        </Route>
        <Route path="/upload/:id">
          <UploadPostPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
    </AuthContext.Provider>
  )
}

export default App
