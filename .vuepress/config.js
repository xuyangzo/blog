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
  locales: {
    '/': {
      lang: 'English',
      title: 'Lynch',
      description: 'Lynch\'s Personal Website'
    },
    '/zh/': {
      lang: '简体中文',
      title: 'Lynch',
      description: 'Lynch的个人网站'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    searchPlaceholder: 'Search...',
    locales: {
      '/': {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'About Me', link: '/resume' },
          {
            text: 'JS',
            items: [
              { text: 'JS Basics', link: '/tags.html#JS%20Basics' },
              { text: 'DOM', link: '/tags.html#DOM' },
              { text: 'Data Structure', link: '/tags.html#Data%20Structure' },
              { text: 'Vue', link: '/tags.html#Vue' }
            ]
          },
          {
            text: 'CSS',
            items: [
              { text: 'CSS Animations', link: '/tags.html#CSS%20Animations' },
              { text: 'CSS Layout', link: '/tags.html#CSS%20Layout' },
              { text: 'CSS Tricks', link: '/tags.html#CSS%20Tricks' }
            ]
          },
          {
            text: 'Network',
            items: [
              { text: 'Https', link: '/tags.html#Https' }
            ]
          },
          {
            text: 'Design Patterns',
            items: [
              { text: 'Singleton', link: '/design-patterns/singleton' },
              { text: 'Factory', link: '/design-patterns/factory' }
            ]
          },
          {
            text: 'LeetCode',
            items: [
              { text: 'Top 100 Liked', link: '/tags.html#Top%20100%20Liked' },
              { text: 'Two Pointers', link: '/tags.html#Two%20Pointers' },
              { text: 'Dynamic Programming', link: '/tags.html#Dynamic%20Programming' },
              { text: 'Tree', link: '/tags.html#Tree' },
              { text: 'Sliding Window', link: '/tags.html#Sliding%20Window' },
              { text: 'Divide and Conquer', link: '/tags.html#Divide%20and%20Conquer' },
              { text: 'Backtracking', link: '/tags.html#Backtracking' }
            ]
          }
        ],
        sidebar: [
          {
            title: 'JS Basics',
            path: '/js-basics/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/js-basics/typeComp',
              '/js-basics/checkArray',
              '/js-basics/thisBind',
              '/js-basics/prototype',
              '/js-basics/new',
              '/js-basics/es5inheritance',
              '/js-basics/gc',
              '/js-basics/arrayLike',
              '/js-basics/eventLoop'
            ]
          },
          {
            title: 'DOM',
            path: '/js-basics/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/js-basics/dragDrop',
              '/js-basics/consolelog',
              '/js-basics/throttle',
              '/js-basics/webWorker'
            ]
          },
          {
            title: 'Data Structure',
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
              '/js-frameworks/hashChangeEvents'
            ]
          },
          {
            title: 'CSS Layout',
            path: '/css-tricks/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/css-tricks/3col',
              '/css-tricks/verticalCenter'
            ]
          },
          {
            title: 'CSS Tricks',
            path: '/css-tricks/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/css-tricks/mouse-leave',
              '/css-tricks/pure5star',
              '/css-tricks/textOverflow'
            ]
          },
          {
            title: 'Network',
            path: '/network/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/network/https'
            ]
          },
          {
            title: 'Design Patterns',
            path: '/design-patterns/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/design-patterns/singleton',
              '/design-patterns/factory'
            ]
          },
          {
            title: 'LeetCode',
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
          },
        ]
      },
      '/zh/': {
        selectText: '选择语言',
        nav: [
          { text: 'Home', link: '/zh/' },
          { text: '关于我', link: '/zh/resume' },
          { text: '前端面试', link: '/zh/interview' },
          {
            text: 'JS',
            items: [
              { text: 'JS基础', link: '/zh/tags.html#JS基础' },
              { text: 'DOM相关', link: '/zh/tags.html#DOM相关' },
              { text: 'ES6', link: '/zh/tags.html#ES6' },
              { text: 'Vue', link: '/zh/tags.html#Vue' }
            ]
          },
          {
            text: 'CSS',
            items: [
              { text: 'CSS动画', link: '/zh/tags.html#CSS动画' },
              { text: 'CSS布局', link: '/zh/tags.html#CSS布局' },
              { text: 'CSS小技巧', link: '/zh/tags.html#CSS小技巧' }
            ]
          },
          {
            text: '网络',
            items: [
              { text: 'Http', link: '/zh/tags.html#Http' },
              { text: 'TCP', link: '/zh/tags.html#TCP' },
              { text: 'UDP', link: '/zh/tags.html#UDP' },
              { text: '网络安全', link: '/zh/tags.html#网络安全' }
            ]
          },
          {
            text: '设计模式',
            items: [
              { text: '单例模式', link: '/zh/design-patterns/singleton' },
              { text: '简单工厂', link: '/zh/design-patterns/factory' }
            ]
          },
          {
            text: '算法',
            items: [
              { text: '排序算法', link: '/zh/tags.html#排序算法' },
              { text: 'JS题目', link: '/zh/tags.html#JS题目' },
              { text: 'LeetCode', link: '/zh/tags.html#LeetCode' }
            ]
          }
        ],
        sidebar: [
          {
            title: 'JS基础',
            path: '/zh/js-basics/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/js-basics/typeComp',
              '/zh/js-basics/checkArray',
              '/zh/js-basics/arrayLike',
              '/zh/js-basics/thisBind',
              '/zh/js-basics/prototype',
              '/zh/js-basics/new',
              '/zh/js-basics/es5inheritance',
              '/zh/js-basics/gc',
              '/zh/js-basics/memoryLeak',
              '/zh/js-basics/eventLoop',
              '/zh/js-basics/deepcopy',
              '/zh/js-basics/iife',
              '/zh/js-basics/closure'
            ]
          },
          {
            title: 'DOM相关',
            path: '/zh/js-basics/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/js-basics/crossOrigin',
              '/zh/js-basics/coJSONP',
              '/zh/js-basics/coDomain',
              '/zh/js-basics/dragDrop',
              '/zh/js-basics/throttle',
              '/zh/js-basics/timer',
              '/zh/js-basics/webWorker',
              '/zh/js-basics/ajax',
              '/zh/js-basics/consolelog'
            ]
          },
          {
            title: 'ES6',
            path: '/zh/js-basics/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/js-basics/scope',
              '/zh/js-basics/promise',
              '/zh/js-basics/weakMapSet',
              '/zh/js-basics/pq'
            ]
          },
          {
            title: 'Vue',
            path: '/zh/js-basics/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/js-frameworks/hashChangeEvents'
            ]
          },
          {
            title: 'CSS基础',
            path: '/zh/css-tricks/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/css-tricks/documentFlow',
              '/zh/css-tricks/boxModel',
              '/zh/css-tricks/bfc',
              '/zh/css-tricks/3col',
              '/zh/css-tricks/verticalCenter',
              '/zh/css-tricks/clearFloat',
              '/zh/css-tricks/triangle',
              '/zh/css-tricks/pure5star',
              '/zh/css-tricks/textOverflow',
              '/zh/css-tricks/mouse-leave',
            ]
          },
          {
            title: '网络',
            path: '/zh/network/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/network/xss-all',
              '/zh/network/xss',
              '/zh/network/xss-stored',
              '/zh/network/xss-dom',
              '/zh/network/https'
            ]
          },
          {
            title: '设计模式',
            path: '/zh/design-patterns/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/design-patterns/singleton',
              '/zh/design-patterns/factory'
            ]
          },
          {
            title: '算法',
            path: '/zh/leetcode/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/zh/leetcode/bubblesort',
              '/zh/leetcode/selectionsort',
              '/zh/leetcode/insertionsort',
              '/zh/leetcode/quicksort',
              '/zh/leetcode/mergesort',
              '/zh/leetcode/arrayToTree',
              '/zh/leetcode/threeSum',
              '/zh/leetcode/LVP',
              '/zh/leetcode/bstLevelTraversal',
              '/zh/leetcode/validateBST',
              '/zh/leetcode/flattenBT',
              '/zh/leetcode/constructBST',
              '/zh/leetcode/jump2',
              '/zh/leetcode/minWindowSubstr',
              '/zh/leetcode/medianOfSA',
              '/zh/leetcode/maxProductSubarr',
              '/zh/leetcode/slidingWindowMax',
              '/zh/leetcode/minStack',
              '/zh/leetcode/removeInvalidParen',
              '/zh/leetcode/taskScheduler',
              '/zh/leetcode/serializeBST',
              '/zh/leetcode/invertBT'
            ]
          },
        ]
      }
    }

  }
}