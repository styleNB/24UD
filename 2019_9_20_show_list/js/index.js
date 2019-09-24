let page = 1
let listDate = ''
let loop1_parentClass = document.getElementsByClassName('loop1_parent')[0]
let loop1Class = document.getElementsByClassName('loop1')[0]
let loop2Class = document.getElementsByClassName('loop2')[0]
let loop0Class = document.getElementsByClassName('loop0')[0]
let leftClass = document.getElementsByClassName('left')[0]
let rightClass = document.getElementsByClassName('right')[0]

// 数据交互
runAxios()
fontSize()
function runAxios(data) {
  let dataArr = data == '' ? null : data == null ? null : data == undefined ? null : typeArr (data)
  axios({
    method:'get',
    url:'http://localhost:8081/list',
    params: {
      name: 'dataArr'
    },
    responseType:'stream'
  })
    .then(function (response) {
      listDate = response.data
      if (listDate.length < 5) {
        searchFind(listDate)
      } else {
        loopImg(listDate)
      }
    })
    .catch(function (error) {
      console.log('出错了：' + error);
    })
}

// 解析字符串以逗号为分隔点转换成数组
function typeArr (data) {
  let dataArr = []
  let patt = /[\u4e00-\u9fa5]+/g
  dataArr = data.match(patt)
  if (dataArr == '' || dataArr == null || dataArr == undefined) {
    alert('没有找到')
    return
  } else if (dataArr.length > 4) {
    alert('只能搜索4个')
    return
  } else {
    return dataArr
  }
}

// 左右移事件
function loopImg (listDate, page) {
  page = page||1
  let listDom = ''
  let listDom2 = ''
  let listDom0 = ''
  for (let i = 0, j = page === 1 ? 0 : 0 + 4 * (page - 1); i < 8; i++, j++) {
    if (page != 1 && listDate[j-4] != null && i<4) {
      listDom0 += `<div class="list">
      <li><img class="list_head" src="./image/Snipaste_2019-09-23_18-13-27.png"></img></li>
      <li class="list_content">${listDate[j-4].name}</li>
      <li class="list_position">${listDate[j-4].position}</li>
      <li class="list_content">
      你有多久没有登陆 QQ 了？3 天？3 个月？还是 3 年？在 QQ 诞生的第 20 个年头，几天前腾讯突然宣布：在 QQ 新版本的更新中，可以实现 QQ 账号注销功能。届时你的 QQ 号将不复存在，所有资料都会被清空，QQ 空间、QQ 钱包、QQ 好友等所有痕迹也都会消失，它们仿佛从未来过，也从未离开。对于大部分人而言，如今 QQ 的使用率已经远远低于微信、微博等社交软件。它被封存在手机的一个角落里，偶尔点进去，看一眼好友列表...
      </li>
      </div>`
      rightClass.setAttribute('onclick', 'right()')
      rightClass.style.cursor = 'default'
    } else if (page === 1) {
      rightClass.onclick = null
      rightClass.style.cursor = 'not-allowed'
    }
    if (i<4 && listDate[j] != null) {
      listDom += `<div class="list">
      <li><img class="list_head" src="./image/Snipaste_2019-09-23_18-13-27.png"></img></li>
      <li class="list_name">${listDate[j].name}</li>
      <li class="list_position">${listDate[j].position}</li>
      <li class="list_content">
      你有多久没有登陆 QQ 了？3 天？3 个月？还是 3 年？在 QQ 诞生的第 20 个年头，几天前腾讯突然宣布：在 QQ 新版本的更新中，可以实现 QQ 账号注销功能。届时你的 QQ 号将不复存在，所有资料都会被清空，QQ 空间、QQ 钱包、QQ 好友等所有痕迹也都会消失，它们仿佛从未来过，也从未离开。对于大部分人而言，如今 QQ 的使用率已经远远低于微信、微博等社交软件。它被封存在手机的一个角落里，偶尔点进去，看一眼好友列表...
      </li>
      </div>`
      leftClass.setAttribute('onclick', 'left()')
      leftClass.style.cursor = 'default'
    } else if (i<4 && listDate[j] == null) {
      leftClass.onclick = null
      leftClass.style.cursor = 'not-allowed'
    }
    if (3<i && i<8 && listDate[j] != null) {
      listDom2 += `<div class="list">
      <li><img class="list_head" src="./image/Snipaste_2019-09-23_18-13-27.png"></img></li>
      <li class="list_content">${listDate[j].name}</li>
      <li class="list_position">${listDate[j].position}</li>
      <li class="list_content">
      你有多久没有登陆 QQ 了？3 天？3 个月？还是 3 年？在 QQ 诞生的第 20 个年头，几天前腾讯突然宣布：在 QQ 新版本的更新中，可以实现 QQ 账号注销功能。届时你的 QQ 号将不复存在，所有资料都会被清空，QQ 空间、QQ 钱包、QQ 好友等所有痕迹也都会消失，它们仿佛从未来过，也从未离开。对于大部分人而言，如今 QQ 的使用率已经远远低于微信、微博等社交软件。它被封存在手机的一个角落里，偶尔点进去，看一眼好友列表...
      </li>
      </div>`
    }
  }
  loop1Class.innerHTML = listDom
  loop2Class.innerHTML = listDom2
  loop0Class.innerHTML = listDom0
  loop1_parentClass.style.left = '0px'
}

// 左右移方法
function left () {
  loop(-1)
}
function right () {
  loop(1)
}
function loop (direction) {
  leftClass.onclick = null
  rightClass.onclick = null
  let loop1StyleWidth = (direction == 1 ? '' : '-') + window.getComputedStyle(loop1Class,null).width
  let number = 0
  let sitv = setInterval (function () {
    number += (5*direction)
    loop1_parentClass.style.left = number + 'px'
    loop1Width = loop1StyleWidth.substr(0, loop1StyleWidth.length-2)
    if (direction == 1 ? (number > loop1Width) : (number < loop1Width)) {
      clearInterval(sitv)
      leftClass.setAttribute('onclick', 'left()')
      rightClass.setAttribute('onclick', 'right()')
      loopImg(listDate, direction == 1 ? (--page) : (++page))
    }
  }, 1)
}

// 搜索方法
function search () {
  let searchVal = document.getElementsByClassName('search_val')[0].value
  runAxios (searchVal)
}

// 搜索事件
function searchFind (listDate) {
  console.log(loop1Class)
  let list0Class = document.getElementsByClassName(list)[0]
  for (let i=0; i<listDate.length; i++) {
    let list0Class = document.getElementsByClassName(list)[i]
    let list_contentDom0 = '<li class="list_content">' + listDate[i].name + '</li>'
    list0Class.innerHTML = list_contentDom0
  }
}

window.onresize = function(){
  fontSize()
}
function fontSize () {
  let bodyWidth = document.body.clientWidth
  let docEl = document.body
  docEl.style.fontSize = bodyWidth*0.01 + 'px'
}