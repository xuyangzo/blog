const path = require('path');

module.exports = {
  base: '/',
  title: 'Lynch',
  home: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@vuepress': path.join(__dirname, '../images/'),
      }
    }
  },
  themeConfig: {
    logo: '/logo.png',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/all-tags' },
      {
        text: 'Vue',
        items: [
          { text: 'Hash Change Events', link: '/vue/hashChangeEvents' }
        ]
      },
      {
        text: 'LeetCode',
        items: [
          { text: 'Top 100 Liked', link: '/tags.html#Top%20100%20Liked' },
          { text: 'Two Pointers', link: '/tags.html#Two%20Pointers' },
          { text: 'Dynamic Programming', link: '/tags.html#Dynamic%20Programming' },
          { text: 'Tree', link: '/tags.html#Tree' },
          { text: 'Sliding Window', link: '/tags.html#Sliding%20Window' }
        ]
      },
      {
        text: 'CSS Tricks',
        items: [
          { text: 'Mouseleave Animations', link: '/css-tricks/mouse-leave.md' }
        ]
      },
      {
        text: 'Design Patterns',
        items: [
          { text: 'Singleton', link: '/design-patterns/singleton' },
          { text: 'Factory', link: '/design-patterns/factory' }
        ]
      }
    ],
    sidebar: [
      {
        title: 'Vue',
        path: '/vue/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/vue/hashChangeEvents'
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
          '/leetcode/minWindowSubstr'
        ]
      },
      {
        title: 'CSS Tricks',
        path: '/css-tricks/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/css-tricks/mouse-leave'
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
      }
    ]
  }
}