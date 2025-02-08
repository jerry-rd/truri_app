<!--
前提：假定所选择的字符串长度大于等于130时带上版权信息

-->
<template>
  <div class="body" id="copy">
    <div>示例一：这不是一个 bug，这只是一个未列出来的特性。</div>
    <div> 示例二：ES6 是一个泛指，含义是 5.1 版以后的 JavaScript。 ES6 是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。 它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，使之成为企业级开发语言。 </div>
    <div class="">
      <textarea rows="30" style="width: 100%; margin-top: 10px" placeholder="内容粘贴到这里"></textarea>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      var copyEl = document.getElementById('copy')
      copyEl.oncopy = function (e) {
        if (window.getSelection(0).toString().length >= 130) {
          var clipboardData = event.clipboardData || window.clipboardData
          // 阻止默认事件
          e.preventDefault()
          var copyMsg = window.getSelection() + '\r\n————————————————\r\n版权声明：本文为xxx的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。' + '\r\n原文链接：' + location.href
          // 将处理完的信息添加到剪切板
          clipboardData.setData('Text', copyMsg)
          // 将处理完的信息添加到剪切板
          clipboardData.setData('Text', copyMsg)
        }
      }
    },
  }
</script>
<style scoped>
  .body {
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    text-align: left;
    background: #fff;
    color: #000;
  }
</style>
