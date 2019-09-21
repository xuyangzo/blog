module.exports = {
  base: '/',
  title: 'Lynch',
  home: true,
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico" }]
  ],
  plugins: ['demo-code'],
  themeConfig: {
    logo: '/logo.png',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/all-tags' },
      {
        text: 'JS Basics',
        items: [
          { text: 'Type Comparison', link: '/js-basics/typeComp' },
          { text: 'Priprity Queue with ES6', link: '/js-basics/pq' }
        ]
      },
      {
        text: 'CSS Basics',
        items: [
          { text: 'Mouseleave Animations', link: '/css-tricks/mouse-leave' }
        ]
      },
      {
        text: 'Network',
        items: [
          { text: 'Https', link: '/tags.html#Https' }
        ]
      },
      {
        text: 'JS Frameworks',
        items: [
          { text: 'Vue', link: '/tags.html#Vue' }
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
          '/js-basics/pq'
        ]
      },
      {
        title: 'CSS Basics',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/mouse-leave'
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
        title: 'JS Frameworks',
        path: '/js-framworks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/js-frameworks/hashChangeEvents'
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
          '/leetcode/taskScheduler'
        ]
      },
    ]
  }
}