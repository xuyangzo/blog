const path = require('path');

module.exports = {
  base: '',
  title: 'Lynch',
  description: 'Just playing around',
  home: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@vuepress': path.join(__dirname, '../images/'),
      }
    }
  },
  // theme: 'api',
  themeConfig: {
    logo: '/logo.png',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'LeetCode',
        items: [
          { text: 'Top 100 Liked', link: '/leetcode/top100liked' },
          { text: 'Dynamic Programming', link: '/leetcode/dp' }
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
        title: 'LeetCode',   // required
        path: '/leetcode/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/leetcode/top100liked',
          '/leetcode/dp'
        ]
      },
      {
        title: 'Design Patterns',   // required
        path: '/design-patterns/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/design-patterns/singleton',
          '/design-patterns/factory'
        ]
      }
    ]
  }
}