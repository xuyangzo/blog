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
      { text: 'Blogs', link: '/tags' },
      {
        text: 'LeetCode',
        items: [
          { text: 'Two Pointers', link: '/tags.html#Two%20Pointers' },
          { text: 'Dynamic Programming', link: '/tags.html#Dynamic%20Programming' }
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
        title: 'LeetCode',
        path: '/leetcode/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/leetcode/threeSum',
          '/leetcode/LVP'
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