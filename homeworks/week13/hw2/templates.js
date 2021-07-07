export const cssTemplate = '.card{ color: rgb(207, 161, 161); }'

export function getLoadMoreButton(className) {
  return `<button class="${className} btn btn-outline-primary my-3">載入更多</button>`
}

export function getForm(className, commentsClassName) {
  return `
  <div>
    <form class="${className} my-3">
      <div class="mb-3">
        <label>暱稱</label>
        <input type="text" name="nickname" class="form-control" ">
      </div>
      <div class="mb-3">
        <label>留言內容</label>
        <textarea class="form-control" name="content" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-outline-primary">送出</button>
    </form>

    <div class="${commentsClassName} my-3"></div>
  </div>`
}
