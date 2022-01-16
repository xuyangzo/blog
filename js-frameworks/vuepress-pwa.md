---
tags: ['Vue']
date: 11.22.2019
image: /images/vuepress-pwa-intro.png
description: 怎么用 VuePress 来搭建一个 PWA 站点
---

# VuePress 教程（？）：用 VuePress 搭建 PWA

> Posted: 11.18.2019

<Tag />

## 介绍

讲道理这其实应该是 VuePress 教程比较靠后的一个部分。

不过我其实暂时还没有想要写 VuePress 的教程（但我感觉其实挺必要的，因为我觉得目前的教程都不咋样）。

所以标题会有一个 ？。等我开始写 VuePress 教程后，再把 ？ 换成数字。

pwa 本身需要讲一下，不算简单，不过 VuePress 的 pwa 都帮你差不多写好了，所以很简单。

其实只要跟着 VuePress 的文档走就行了，但有些东西需要额外提一下。

## 效果

先给大家看一下最终达成的效果：

![pwa](/images/pwa.gif)

## manifest.json

首先，pwa 是需要一个 manifest.json 来处理各种 native 的表现的。

学过 pwa 的人肯定会，但如果对 pwa 不太熟悉的话，还是需要看一下的。

```json
{
  // name 是你打开 app 的时候，底下跳出的 name
  "name": "Lynch 的博客",
  // background_color 就是打开 app 的时候，背景颜色
  "background_color": "white",
  // short_name 就是你 app 图标下的名字
  "short_name": "Lynch",
  // 语言，zh-CN 就是中文
  "lang": "zh-CN",
  // start_url 就是当你点击 app 图标后，打开的页面
  "start_url": "/index.html",
  // standalone 就是以独立 app 的样式打开，不展示浏览器
  "display": "standalone",
  /**
    * theme_color 管的是页面以外的 theme，比如地址栏
    * 和 meta 标签里的 theme-color 效果一样
    * 但是会被 meta 标签里的 theme-color 所覆盖
    * 并且如果是 standalone 的话，用不到这个
    */
  "theme_color": "white",
  /**
    * orientation 简单来说就是横屏还是竖屏
    * 但其实配置的选项蛮多的，一般情况下就用 portrait-primary
    */
  "orientation": "portrait-primary",
  /**
    * icons 就是你原生 app 的图标，因为不同的系统需要不同的图标大小
    * 所以这里需要提供一大堆图标
    */
  "icons": [
    {
      "src": "/icons/lynch-icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/lynch-icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/lynch-icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/lynch-icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/lynch-icon-256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "/icons/lynch-icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

这个 manifest.json 就放在 public 里就行了。

## head

安装就不说了，直接看文档：[@vuepress/plugin-pwa](https://vuepress.vuejs.org/plugin/official/plugin-pwa.html#install)

接下来看一下 head，因为我们知道，为了支持 pwa，我们需要设置一些特殊的 head。

```js
module.exports = {
  head: [
    // 这个其实就是 favicon，如果已经设了 favicon 就可以不用管
    ['link', { rel: 'icon', href: '/logo.png' }],
    // 这个指向上面的 manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // 这个刚才说了，如果在这里定义了，会覆盖 manifest 文件里的 theme_color
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    /**
     * ios 需要的 head，content = yes 才会是全屏模式
     * 在 manifest 里设置 standalone 对于 ios 是无效的
     */
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    /**
     * ios 需要的 head，只有在设置了上面那个 meta 的情况下才有效
     * 指定了状态栏的颜色（就是手机最上方显示时间，wifi信号的那一行）
     */
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    // ios 需要的 head，指定了添加到桌面时的图标
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    // ios 需要的 head，简单来说就是 favicon
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    // windows 8 需要的 head，简单来说就是 favicon
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // windows 8 需要的 head，简单来说就是图标背后格子的颜色
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: ['@vuepress/pwa', {
    // 开启 service worker
    serviceWorker: true,
    // 如果有 update 的话，是否展示弹窗
    updatePopup: true
  }],
}
```

## service worker

在生产环境下编译后，我们就能看见 server-worker.js 这个文件。

VuePress 的 service worker 是通过 [workbox](https://developers.google.com/web/tools/workbox) 来生成的。

workbox 这里就不详细说了，简单来说就是 Google 的一个处理 service worker 的工具。

如果你去 service-worker.js 这个文件里查看，你是看不见一般的 service worker 需要的 install、activate、fetch 这些事件的，那是因为 workbox 已经把这些事情处理好了。也就是说我们不需要去关心怎么注册安装 service worker 这些东西，只需要直接用就行了。

## 修改弹窗

这个时候，如果我们更新的内容，我们页面的右下角会出现一个这样的弹窗：

![pwa popup](/images/pwa-popup.png)

安卓设备也是一样，iOS 则是没有这个弹窗（iOS 对 pwa 的支持大家有目共睹）。

但是这么一个弹窗看上去好像不是特别好看啊。作为一个前端，自然得改得好看一点。

所以根据 VuePress 文档的指引，我们去 .vuepress/components 里新建我们自己的组件。

<span v-red>**注意，如下的操作对我无效！我目前还不知道正确修改弹窗的方式！**</span>

我自己的组件长这样：

```vue
<template>
  <SWUpdatePopup>
    <div v-slot="{ enabled, reload, message, buttonText }" class="my-sw-update-popup">
      傻屌作者又更新啦！！！
      <br />
      <v-btn @click="reload">刷新</v-btn>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from "@vuepress/plugin-pwa/lib/SWUpdatePopup.vue";

export default {
  components: { SWUpdatePopup }
};
</script>

<style>
@keyframes drop {
  0% {
    top: -20px;
    oapcity: 0;
  }

  100% {
    top: 20px;
    opacity: 1;
  }
}

.my-sw-update-popup {
  text-align: right;
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid mediumpurple;
  animation: drop 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}
</style>
```

然后去 config 里指定我们自己的组件作为弹窗：

```javascript
module.exports = {
   plugins: {
    '@vuepress/pwa': {
       serviceWorker: true,
+      popupComponent: 'MySWUpdatePopup',
       updatePopup: true
     }
  }
}
```

## 总结

那么我们基本上已经完成了 VuePress 站点 pwa 的构建。

如果需要像手机一样，有消息的推送，而不是这样的弹窗，那么是需要服务器的。

如果真的想要这么做（虽然我觉得没必要），那么大家可以建一个 node 服务器，然后自己去搞。

## 参考资料

[@vuepress/plugin-pwa](https://vuepress.vuejs.org/plugin/official/plugin-pwa.html#install)

<Chirpy />