---
tags: ['设计模式', 'TypeScript', '面试问题 - 设计模式']
date: 10.10.2019
image: /images/factory-intro.jpg
description: 简单工厂那么简单，学一下又不花什么时间
---

# TypeScript 实现简单工厂

> Posted: 10.10.2019

<Tag />

## 介绍

### 特性

定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其实例创建过程延迟到子类进行。

这样可以节省资源。因为如果你一开始就创建所有实例，然后让用户选，那么没被选中的实例就相当于在划水，浪费资源。

在创建的对象数量较少，以及对象的创建逻辑不复杂的时候使用。

### 应用场景

我们明确地计划不同条件下创建不同实例时。

<span v-red>**例子1：**</span>

设计一个连接服务器的框架，需要三个协议，"POP3"、"IMAP"、"HTTP"，可以把这三个作为产品类，共同实现一个接口。

## 代码实现

```typescript
interface Shape {
  type: string;
  draw: () => void;
}

// 创建一个 Circle
class Circle implements Shape {
  constructor(public type: string) { }

  draw() {
    console.log('Draw circle!');
  }
}

// 创建一个 Square
class Square implements Shape {
  constructor(public type: string) { }

  draw() {
    console.log('Draw square!');
  }
}

class ShapeFactory {
  // 通过静态方法来获取 Shape 的实例
  static getInstance(shape: string) {
    switch (shape) {
      case 'circle':
        return new Circle(shape);

      case 'square':
        return new Square(shape);

      default:
        throw new Error('参数错误, 可选参数：circle、square');
    }
  }
}

// 测试
const circle = ShapeFactory.getInstance('circle');
circle.draw(); // 打印 'Draw circle!'

const square = ShapeFactory.getInstance('square');
square.draw(); // 打印 'Draw square!'

try {
  const rectangle = ShapeFactory.getInstance('rectangle');
} catch (err) {
  // 打印 Error: 参数错误, 可选参数：circle、square
  console.log(err);
}
```

## 参考资料

[从ES6重新认识JavaScript设计模式(二): 工厂模式](https://www.jianshu.com/p/11918dd0f694)

[工厂模式](https://www.runoob.com/design-pattern/factory-pattern.html)

<Disqus />