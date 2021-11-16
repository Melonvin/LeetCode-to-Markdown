function convertHtmlToMarkdown() {
  // 获取标题
  let title = document.querySelector("h4[data-cypress='QuestionTitle'] a").innerText.replaceAll(' ', '')
  const url = window.location.href
  title = `# <a href="${url}">${title}</a>`

  // 获取难度
  let degree = document.querySelector('span[data-degree]').innerText

  // 获取题目内容
  let content = document.querySelector('.content__1Y2H .notranslate').children
  let res = ''
  for (let i = 0; i < content.length; i++) {
    let item = content[i]
    if (item.localName === 'pre') {
      item = item.outerHTML
    } else {
      item = item.innerHTML
    }
    let temp = item.replaceAll('<code>', '`')
      .replaceAll('</code>', '`')
      .replaceAll('&nbsp;', ' ')
      .replaceAll('<pre>', '```')
      .replaceAll('</pre>', '```');
    res = res + `${temp}\n\n`
  }
  console.log(res)
}


chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: convertHtmlToMarkdown
  });
});