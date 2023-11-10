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
        { text: '最新', link: '/recent.html' },
        { text: '所有标签', link: '/all_tags.html' },
        {
          text: '文学',
          items: [
            { text: '小说', link: '/tags.html#小说' },
            { text: '诗', link: '/tags.html#诗' },
            { text: '随笔', link: '/tags.html#随笔' }
          ]
        },
        {
          text: '生活',
          items: [
            { text: '菜', link: '/tags.html#菜' }
          ]
        }
      ],
      sidebar: [
        {
          title: '随笔',
          path: '/essay/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/essay/illustration',
            '/essay/life_change',
            '/essay/cry',
            '/essay/jubensha',
            '/essay/work_month',
            '/essay/recover',
            '/essay/argue',
            '/essay/men_guide',
            '/essay/reply',
            '/essay/ephemeral'
          ]
        },
        {
          title: '菜',
          path: '/dishes/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/dishes/total',
            '/dishes/roast_shrimp',
            '/dishes/new_aoerliang',
            '/dishes/tea_egg',
            '/dishes/beef_soup',
            '/dishes/fried_shrimp',
            '/dishes/shrimp_tofu',
            '/dishes/curry_chicken'
          ]
        },
        {
          title: '小说',
          path: '/novels/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/novels/nodick',
            '/novels/ggbh',
            '/novels/ysqn_down',
            '/novels/ysqn_setting',
            '/novels/dead_river1',
            '/novels/dead_river2',
            '/novels/dead_river3',
            '/novels/dead_river4',
            '/novels/dead_river5'
          ]
        },
        {
          title: '诗',
          path: '/poems/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/poems/wait'
          ]
        }
      ]
    }
  } 