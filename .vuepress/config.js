module.exports = {
  base: '/',
  title: 'Lynch',
  home: true,
  head: [
    ['link', { rel: "shortcut icon", href: "/icons/favicon.ico" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://at.alicdn.com/t/font_1433990_ifszlsjjs6.css"
      }
    ],
    // following are pwa support
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: 'white' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/lynch-icon-152.png' }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/lynch-icon-144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]

  ],
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['vuepress-plugin-code-copy', true],
    ['demo-code'],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-151185835-1'
      }
    ],
    [
      '@vuepress/medium-zoom',
      {
        selector: '.theme-default-content p img, .cat-image'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/logo.png',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      { text: '最新文章', link: '/recent.html' },
      { text: '前端面试', link: '/interview' },
      {
        text: 'JS',
        items: [
          { text: 'JS基础', link: '/tags.html#JS基础' },
          { text: 'DOM相关', link: '/tags.html#DOM相关' },
          { text: '浏览器', link: '/tags.html#浏览器' },
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
          { text: '网络基础', link: '/tags.html#网络基础' },
          { text: '网络协议', link: '/tags.html#网络协议' },
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
          '/js-basics/call',
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
          '/js-basics/bubble',
          '/js-basics/dragDrop',
          '/js-basics/throttle',
          '/js-basics/timer',
          '/js-basics/webWorker',
          '/js-basics/ajax'
        ]
      },
      {
        title: '浏览器',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-basics/crossOrigin',
          '/js-basics/coJSONP',
          '/js-basics/coDomain',
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
          '/js-basics/invsof',
          '/js-basics/promise-all.md'
        ]
      },
      {
        title: '数据结构',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-basics/pq'
        ]
      },
      {
        title: 'Vue',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-frameworks/hashChangeEvents',
          '/js-frameworks/vuepress-pwa'
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
        ]
      },
      {
        title: 'CSS小技巧',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/selectors',
          '/css-tricks/triangle',
          '/css-tricks/pure5star',
          '/css-tricks/textOverflow',
        ]
      },
      {
        title: 'CSS动画',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/mouse-leave'
        ]
      },
      {
        title: '网络基础',
        path: '/network/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/network/osi',
          '/network/hybrid-model'
        ]
      },
      {
        title: '网络协议',
        path: '/network/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/network/tcp-intro',
          '/network/tcp-rely',
          '/network/status-code',
          '/network/301vs302'
        ]
      },
      {
        title: '网络安全',
        path: '/network/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
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
          '/leetcode/arrayToTree'
        ]
      },
      {
        title: 'LEETCODE',
        path: '/leetcode/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
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
      }
    ]
  }
}