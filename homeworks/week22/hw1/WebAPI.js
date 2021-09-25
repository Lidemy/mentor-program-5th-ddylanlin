/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import { getAuthToken } from './utils'

const BASE_URL = 'https://student-json-api.lidemy.me'

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_start=0&_limit=10`)
    .then(res => res.json())
}

export const get5Posts = (page) => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_limit=5&_page=${page}`)
    .then(res => res.json())
}

export const getTotalPosts = (page) => {
  return fetch(`${BASE_URL}/posts?_start=0&_limit=10`)
    .then(res => res.headers.get('X-Total-Count'))
}

export const getSinglePost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`)
    .then(res => res.json())
}

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => res.json())
}

export const getMe = () => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
}

export const register = (username, nickname, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      username,
      password
    })
  })
    .then(res => res.json())
}

export const addPost = (token, title, body) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  })
    .then(res => res.json())
}

export const deletePost = (token, id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`,
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

export const editPost = (token, id, title, body) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then(res => res.json())
}
