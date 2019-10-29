module.exports = {
  base: '/',
  title: 'Lynch',
  home: true,
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://at.alicdn.com/t/font_1433990_ifszlsjjs6.css"
      }
    ]
  ],
  plugins: [
    ['vuepress-plugin-code-copy', true],
    ['demo-code']
  ],
  themeConfig: {
    logo: '/logo.png',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      { text: '关于我', link: '/resume' },
      { text: '最新文章', link: '/recent.html' },
      { text: '前端面试', link: '/interview' },
      {
        text: 'JS',
        items: [
          { text: 'JS基础', link: '/tags.html#JS基础' },
          { text: 'DOM相关', link: '/tags.html#DOM相关' },
          { text: 'ES6', link: '/tags.html#ES6' },
          { text: 'Vue', link: '/tags.html#Vue' }
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: 'CSS动画', link: '/tags.html#CSS动画' },
          { text: 'CSS布局', link: '/tags.html#CSS布局' },
          { text: 'CSS小技巧', link: '/tags.html#CSS小技巧' }
        ]
      },
      {
        text: '网络',
        items: [
          { text: 'Http', link: '/tags.html#Http' },
          { text: 'TCP', link: '/tags.html#TCP' },
          { text: 'UDP', link: '/tags.html#UDP' },
          { text: '网络安全', link: '/tags.html#网络安全' }
        ]
      },
      {
        text: '设计模式',
        items: [
          { text: '单例模式', link: '/design-patterns/singleton' },
          { text: '简单工厂', link: '/design-patterns/factory' }
        ]
      },
      {
        text: '算法',
        items: [
          { text: '排序算法', link: '/tags.html#排序算法' },
          { text: 'JS题目', link: '/tags.html#JS题目' },
          { text: 'LeetCode', link: '/tags.html#LeetCode' }
        ]
      }
    ],
    sidebar: [
      {
        title: 'JS基础',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-basics/typeComp',
          '/js-basics/checkArray',
          '/js-basics/arrayLike',
          '/js-basics/thisBind',
          '/js-basics/prototype',
          '/js-basics/new',
          '/js-basics/es5inheritance',
          '/js-basics/gc',
          '/js-basics/memoryLeak',
          '/js-basics/eventLoop',
          '/js-basics/deepcopy',
          '/js-basics/iife',
          '/js-basics/closure'
        ]
      },
      {
        title: 'DOM相关',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-basics/crossOrigin',
          '/js-basics/coJSONP',
          '/js-basics/coDomain',
          '/js-basics/dragDrop',
          '/js-basics/throttle',
          '/js-basics/timer',
          '/js-basics/webWorker',
          '/js-basics/ajax',
          '/js-basics/consolelog'
        ]
      },
      {
        title: 'ES6',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-basics/scope',
          '/js-basics/promise',
          '/js-basics/weakMapSet',
          '/js-basics/pq'
        ]
      },
      {
        title: 'Vue',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-frameworks/hashChangeEvents'
        ]
      },
      {
        title: 'CSS基础',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/documentFlow',
          '/css-tricks/boxModel',
          '/css-tricks/bfc',
          '/css-tricks/3col',
          '/css-tricks/verticalCenter',
          '/css-tricks/clearFloat',
          '/css-tricks/triangle',
          '/css-tricks/pure5star',
          '/css-tricks/textOverflow',
          '/css-tricks/hide',
          '/css-tricks/mouse-leave',
        ]
      },
      {
        title: '网络',
        path: '/network/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/network/status-code',
          '/network/301vs302',
          '/network/xss-all',
          '/network/xss',
          '/network/xss-stored',
          '/network/xss-dom'
        ]
      },
      {
        title: '设计模式',
        path: '/design-patterns/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/design-patterns/singleton',
          '/design-patterns/factory'
        ]
      },
      {
        title: '算法',
        path: '/leetcode/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/leetcode/bubblesort',
          '/leetcode/selectionsort',
          '/leetcode/insertionsort',
          '/leetcode/quicksort',
          '/leetcode/mergesort',
          '/leetcode/arrayToTree',
          '/leetcode/threeSum',
          '/leetcode/LVP',
          '/leetcode/bstLevelTraversal',
          '/leetcode/validateBST',
          '/leetcode/flattenBT',
          '/leetcode/constructBST',
          '/leetcode/jump2',
          '/leetcode/minWindowSubstr',
          '/leetcode/medianOfSA',
          '/leetcode/maxProductSubarr',
          '/leetcode/slidingWindowMax',
          '/leetcode/minStack',
          '/leetcode/removeInvalidParen',
          '/leetcode/taskScheduler',
          '/leetcode/serializeBST',
          '/leetcode/invertBT'
        ]
      },
    ]
  }
}