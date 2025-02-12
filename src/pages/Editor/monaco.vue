<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">Monaco Editor</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="https://microsoft.github.io/monaco-editor/" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://microsoft.github.io/monaco-editor/ </a>
      </h1>
      <div id="container" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white"></div>
    </div>
  </div>
</template>
<script setup>
  import * as monaco from 'monaco-editor'
  import { ref, onMounted, onBeforeMount } from 'vue'
  const monacoEditor = ref(null)
  const monacoEditorBindEvent = () => {
    if (monacoEditor.value) {
      // 实时获取编辑器的值
      monacoEditor.value.onDidChangeModelContent((e) => {
        console.log('🚀 ~ monacoEditor.value.onDidChangeModelContent ~ e:', e)
      })
    }
  }
  onMounted(() => {
    monacoEditor.value = monaco.editor.create(document.getElementById('container'), {
      value: '// Write your code here',
      language: 'javascript',
      // automaticLayout: true,
      theme: 'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
      // minimap: {
      //   enabled: true, // 关闭小地图
      // },
    })

    //     {
    //     acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    //     acceptSuggestionOnEnter: 'off', // 接受输入建议 "on" | "off" | "smart"
    //     accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
    //     accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
    //     autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    //     autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    //     autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    //     autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    //     automaticLayout: true, // 自动布局
    //     codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
    //     codeLensFontFamily: '', // codeLens的字体样式
    //     codeLensFontSize: 13, // codeLens的字体大小
    //     colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
    //     comments: {
    //       ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
    //       insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    //     }, // 注释配置
    //     contextmenu: false, // 启用上下文菜单
    //     columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
    //     autoSurround: 'never', // 是否应自动环绕选择
    //     copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
    //     cursorBlinking: 'smooth', // 光标动画样式
    //     cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
    //     cursorStyle: 'line', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
    //     cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    //     cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
    //     cursorWidth: 2, // <=25 光标宽度
    //     minimap: {
    //       enabled: false, // 是否启用预览图
    //     }, // 预览图设置
    //     scrollbar: {
    //       verticalScrollbarSize: 5,
    //       horizontalScrollbarSize: 5,
    //       arrowSize: 10,
    //       alwaysConsumeMouseWheel: false,
    //     },
    //     folding: false, // 是否启用代码折叠
    //     links: true, // 是否点击链接
    //     overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
    //     renderLineHighlight: 'gutter', // 当前行突出显示方式
    //     scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
    //     readOnly: false, // 是否为只读模式
    //     lineNumbers: 'on',
    //     lineNumbersMinChars: 0,
    //     theme: 'vs', //官方自带三种主题vs, hc-black, or vs-dark
    //     value: props.code || '{}', //编辑器初始显示文字
    //     language: 'json',
    //     fontSize: 13,
    //     roundedSelection: true, // 右侧不显示编辑器预览框
    //     autoIndent: 'full',
    //     formatOnType: true,
    //     formatOnPaste: true
    //   }

    monacoEditorBindEvent()
  })
  onBeforeMount(() => {
    monacoEditor.value?.dispose()
  })
</script>
<style>
  /* Remove the old styles as they're now handled by Tailwind classes */
</style>
