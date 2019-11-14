```javascript
class Foo extends React.Component{
  constructor( props ){
    super( props );
    // 我们需要这么做，不然 this 会显示 undefined
    this.handleClick = this.handleClick.bind(this);
  }
    
  handleClick(event){
    console.log(this);
  }
    
  render(){
    return (
      <button type="button" onClick={this.handleClick}>
        Click Me
      </button>
    );
  }
}
```

对于隶属于类里的方法，我们需要手动添加：`this.handleClick = this.handleClick.bind(this)`。

这是为什么？

原因很简单：我们想要让 this.handleClick 的 this，指向当前这个类。

因为在继承的过程中，this 的指向一直在改变。如果子类调用了父类的 handleClick 方法，那么该方法就会在子类的 this 下执行