import $ from 'jquery' //eslint-disable-line
import { getComments, addComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getForm } from './templates'

export default function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDOM = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more` //eslint-disable-line
  commentsClassName = `${siteKey}-comments` //eslint-disable-line
  formClassName = `${siteKey}-add-comment-form` //eslint-disable-line
  commentsSelector = '.' + commentsClassName //eslint-disable-line
  formSelector = '.' + formClassName //eslint-disable-line

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))
  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }

    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
    })
  })

  function getNewComments() {
    const commentDOM = $(commentsSelector)
    $(`.${loadMoreClassName}`).hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }

      const comments = data.discussions
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment)
      }
      let length = comments.length //eslint-disable-line
      if (length === 0) {
        isEnd = true
      }
      lastId = comments[length - 1]
      const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
      $(commentsSelector).append(loadMoreButtonHTML)

      if (lastId === 1) {
        $(`.${loadMoreClassName}`).hide()
      }
    })
  }
}
