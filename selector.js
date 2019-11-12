(function () {
    var select = {}
    var firstIndex = 0, // 默认选中的第一列的第一项
        secondIndex = 0, // 默认选中第二列的第一项
        thirdIndex = 0, // 默认选中第三列的第一项
        firstCode, // 省的code
        secondCode, // 市的code
        thirdCode, // 区的code
        firstName, // 省的名字
        secondName, // 市的名字
        thirdName    // 区的名字
    var listArray = [] // 用来存放数据的数组
    var selectorBg // 样式的背景元素
    var mouseOver = false
    select.buildUi = function() {
        var html = '<ul id="g-first-select-ul" class="g-select-box-ul">' + '</ul>' +
                    '<ul id="g-second-select-ul" class="g-select-box-ul">' + '</ul>' +
                    '<ul id="g-third-select-ul" class="g-select-box-ul">' + '</ul>'
        selectorBg.innerHTML = html
        select.buildFirstUi()
    }
    // 布局第一列
    select.buildFirstUi = function() {
        var firstElement = document.querySelector('#g-first-select-ul'),
            html = ''
        for (var i = 0; i < listArray.length; i++) {
            if (i === +firstIndex) {
                html = html + '<li class="g-box-element active" data-id="' + listArray[i].code + '" data-column="1" data-index="' + i + '">' + listArray[i].name + '</li>'
            } else {
                html = html + '<li class="g-box-element" data-id="' + listArray[i].code + '" data-column="1" data-index="' + i + '">' + listArray[i].name + '</li>'
            }
        }
        firstElement.innerHTML = html
        // 获取第一列li元素，添加方法
        var itemElement = document.querySelectorAll('#g-first-select-ul li') //
        for (var i = 0; i < itemElement.length; i++) {
            itemElement[i].addEventListener('mouseover', function (evt) {
                firstCode = evt.target.dataset.id
                firstName = evt.target.innerHTML
                console.log(evt.target.dataset.id, evt.target.innerHTML, 222222)
                firstIndex = evt.target.dataset.index
                secondIndex = 0
                applyColor(firstIndex, itemElement)
                select.buildSecondUi()
            })
        }
        select.buildSecondUi()
    }
    // 布局第二列
    select.buildSecondUi = function() {
        var secondHtml = document.querySelector('#g-second-select-ul'),
            html = ''
        for (var j = 0; j < listArray[+firstIndex].childs.length; j++) {
            if (j === secondIndex) {
                html = html + '<li class="g-box-element active" data-id="' + listArray[+firstIndex].childs[j].code + '" data-column="2" data-index="' + j +'">' + listArray[+firstIndex].childs[j].name + '</li>'
            } else {
                html = html + '<li class="g-box-element" data-id="' + listArray[+firstIndex].childs[j].code + '" data-column="2" data-index="' + j +'">' + listArray[+firstIndex].childs[j].name + '</li>'
            }
        }
        if (listArray[+firstIndex].childs.length === 1) {
            secondIndex = 0
            secondName = listArray[+firstIndex].childs[0].name
            secondCode = listArray[+firstIndex].childs[0].code
        }
        secondHtml.innerHTML = html
        // 获取第二列li元素，添加方法
        var secondItemList = document.querySelectorAll('#g-second-select-ul li')
        for (var j = 0; j < secondItemList.length; j++) {
            secondItemList[j].addEventListener('mouseover', function (evt) {
                secondIndex = evt.target.dataset.index
                thirdIndex = 0
                applyColor(secondIndex, secondItemList)
                select.buildThirdUi()
                secondCode = evt.target.dataset.id
                secondName = evt.target.innerHTML
            })
        }
        select.buildThirdUi()
    }
    // 布局第三列
    select.buildThirdUi = function () {
        var thirdHtml = document.querySelector('#g-third-select-ul'),
            html = ''
        console.log(listArray[+firstIndex].childs[+secondIndex], listArray[+firstIndex], secondIndex,99999)
      if (listArray[+firstIndex].childs[+secondIndex].childs) {
          for (var k = 0; k < listArray[+firstIndex].childs[+secondIndex].childs.length; k++) {
              if (k === thirdIndex) {
                  html = html + '<li class="g-box-element active" data-id="' + listArray[+firstIndex].childs[+secondIndex].childs[k].code + '" data-column="3" data-index="' + k + '">' + listArray[+firstIndex].childs[+secondIndex].childs[k].name + '</li>'
              } else {
                  html = html + '<li class="g-box-element" data-id="' + listArray[+firstIndex].childs[+secondIndex].childs[k].code + '" data-column="3" data-index="' + k + '">' + listArray[+firstIndex].childs[+secondIndex].childs[k].name + '</li>'
              }
          }
      }
        thirdHtml.innerHTML = html
        // 获取第三列li元素，添加方法
        var thirdItemList = document.querySelectorAll('#g-third-select-ul li')
        for (var k = 0; k < thirdItemList.length; k++) {
            thirdItemList[k].addEventListener('mouseover', function (evt1) {
                thirdIndex = evt1.target.dataset.index
                applyColor(thirdIndex, thirdItemList)
                thirdCode = evt1.target.dataset.id
                thirdName = evt1.target.innerHTML
            })
        }
    }
    //
    select.create = function() {
        selectorBg = document.querySelector('.g-select-box-bg')
        if (!selectorBg) {
            selectorBg = document.createElement('div')
            selectorBg.className = 'g-select-box-bg'
            document.body.appendChild(selectorBg)
        }
        select.buildUi()

    }
    // 初始化
    select.init = function(element, listInfo) {
        listArray = listInfo
        var item = document.querySelector(element)
        selector.create()
        var isShow = false // 用来判断是否点击显示插件样式
        // 点击输入框，隐藏或者消失弹框
        item.addEventListener('click', function (e) {
            if (isShow) {
                selectorBg.classList.remove('g-select-box-bg-display')
                isShow = false
            } else {
                selectorBg.classList.add('g-select-box-bg-display')
                isShow = true
                var top = item.offsetTop
                var left = item.offsetLeft
                var height = item.offsetHeight
                selectorBg.style.top = top + height + 2 + 'px'
                selectorBg.style.left = left + 'px'
            }
            e.stopPropagation()
        })
        // 每一列的点击事件
        selectorBg.addEventListener('click', function (event) {
            var selectIndex = event.target.dataset.column
            switch (+selectIndex) {
                case 1:
                    // 判断第一列后是否还有要展示的第二列，如果没有，保存信息，弹框消失
                    if (!listArray[+firstIndex].childs) {
                        selectorBg.classList.remove('g-select-box-bg-display')
                        item.value = firstName
                        item.dataset.code = firstCode
                    }
                    break
                case 2:
                    // 判断第二列后是否还要展示第三列数据，如果没有则保存当前信息，弹框消失
                    if (!listArray[+firstIndex].childs[+secondIndex].childs) {
                        selectorBg.classList.remove('g-select-box-bg-display')
                        item.value = firstName + '/' + secondName
                        item.dataset.code = firstCode + '/' + secondCode
                    }
                    break
                case 3:
                    // 选中第三列数据，弹框消失
                    selectorBg.classList.remove('g-select-box-bg-display')
                    item.value = firstName + '/' + secondName + '/' + thirdName
                    item.dataset.code = firstCode + '/' + secondCode + '/' + thirdCode
                    break
                default:
                    break
            }
            event.stopPropagation()
        })
        document.body.addEventListener('click', function (e) {
            selectorBg.classList.remove('g-select-box-bg-display')
            isShow = false
        })
    }
    // 渲染颜色
    function applyColor (index, listArray) {
        for (var i = 0; i < listArray.length; i++) {
            listArray[i].classList.remove('active')
            if (i === +index) {
                listArray[i].classList.add('active')
            }
        }
    }

    window.selector = select
})()
