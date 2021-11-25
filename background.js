function convertHtmlToMarkdown() {
  // 获取标题
  let title = document.querySelector("h4[data-cypress='QuestionTitle'] a").innerText.replaceAll(' ', '')
  const url = window.location.href
  title = `# [${title}](${url})`

  // 获取难度
  let degree = document.querySelector('span[data-degree]').innerText

  // 获取题目内容
  let content = document.querySelector('.content__1Y2H .notranslate').children
  let res = ''
  for (let i = 0; i < content.length; i++) {
    let item = content[i]
    if (item.localName === 'pre') {
      item = item.outerHTML
      item = item.replaceAll('<strong>', '')
        .replaceAll('</strong>', '')
    } else {
      item = item.innerHTML
    }
    let temp = item.replaceAll('<code>', '`')
      .replaceAll('</code>', '`')
      .replaceAll('&nbsp;', ' ')
      .replaceAll('<pre>', '```\n')
      .replaceAll('</pre>', '```')
      .replaceAll('<li>', '- ')
      .replaceAll('</li>', '')
      .replaceAll('&lt;', '<')
      .replaceAll('\t', '');
    res = res + `${temp}\n\n`
  }

  res = title + '\n## 题目\n' + res + '\n## 题目大意\n\n' + '\n## 解题思路\n\n' + '\n## 代码\n' + '```js\n```';
  navigator.clipboard.writeText(res).then(function () {
    alert('题目已成功提取到剪贴板')
  }, function (err) {
    alert('题目提取失败' + err)
  })

}


chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: convertHtmlToMarkdown
  });
});