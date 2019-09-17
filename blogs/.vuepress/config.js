const path = require('path');

module.exports = {
  base: '/blog/',
  title: 'Hello VuePress',
  description: 'Just playing around',
  home: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@vuepress': path.join(__dirname, '../images/'),
      }
    }
  },
  themeConfig: {
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'LeetCode', link: '/leetcode/' },
      {
        text: 'Design Patterns',
        items: [
          { text: 'Singleton', link: '/design-patterns/singleton' },
          { text: 'Factory', link: '/design-patterns/factory' }
        ]
      }
    ],
    // sidebar: [
    //   {
    //     title: 'LeetCode',   // required
    //     path: '/leetcode/',      // optional, which should be a absolute path.
    //     collapsable: true, // optional, defaults to true
    //     sidebarDepth: 1,    // optional, defaults to 1
    //     children: [
    //       '/leetcode/top100liked'
    //     ]
    //   },
    //   {
    //     title: 'Design Patterns',   // required
    //     path: '/design-patterns/',      // optional, which should be a absolute path.
    //     collapsable: true, // optional, defaults to true
    //     sidebarDepth: 1,    // optional, defaults to 1
    //     children: [
    //       '/design-patterns/singleton',
    //       '/design-patterns/factory'
    //     ]
    //   }
    // ]
    sidebar: {
      '/leetcode/': [
        '',
        'top100liked'
      ],
      '/design-patterns/': [
        '',
        'singleton',
        'factory'
      ],
      '/': [
        ''
      ]
    }
  }
}