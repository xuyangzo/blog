module.exports = {
  base: '/',
  title: 'Lynch',
  home: true,
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico" }]
  ],
  plugins: [
    ['vuepress-plugin-code-copy', true],
    ['demo-code', {
      jsLibs: [
        // umd
        'https://unpkg.com/tua-storage/dist/TuaStorage.umd.js',
      ],
      cssLibs: [
        'https://unpkg.com/animate.css@3.7.0/animate.min.css',
      ],
      showText: 'show code',
      hideText: 'hide',
      styleStr: 'text-decoration: underline;',
      minHeight: 200,
      onlineBtns: {
        codepen: false,
        jsfiddle: true,
        codesandbox: true,
      },
      codesandbox: {
        deps: { 'lodash': 'latest' },
        json: '',
        query: '',
        embed: '',
      },
      demoCodeMark: 'demo-code',
    }]
  ],
  themeConfig: {
    logo: '/logo.png',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/all-tags' },
      {
        text: 'JS',
        items: [
          { text: 'JS Basics', link: '/tags.html#JS%20Basics' },
          { text: 'DOM', link: '/tags.html#JS%20DOM' },
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
          '/js-basics/checkArray'
        ]
      },
      {
        title: 'DOM',
        path: '/js-basics/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-basics/dragDrop',
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
        title: 'CSS Animations',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/mouse-leave'
        ]
      },
      {
        title: 'CSS Layout',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/3col'
        ]
      },
      {
        title: 'CSS Tricks',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/pure5star'
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
  }
}