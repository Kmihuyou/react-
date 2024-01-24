import React from "react";

class LifeTimes extends React.Component {
  // 如果只是单纯的定义一个组件的状态 不必要使用constructor
  // state ={count:0,list:[1,2,3]}
  // 只执行一次 最开始触发
  constructor(props) {
    super(props);
    this.state = { count: 0, list: [1, 2, 3] };
  }
  // 默认返回true 只要props/state发生变化都会执行render + componentDidUpdate
  //性能优化:避免不必须的更新render
  shouldComponentUpdate(nextProps, nestState) {
    // 更新前数据
    console.log(this.props, this.state);
    // 更新后数据
    console.log(nextProps, nestState);
  }
  // 执行若干次 更新 constructor触发之后
  render() {
    return <div>LifeTimes</div>;
  }
  // 执行若干次
  componentDidUpdate(prevProps, prevState) {
    // 上一次数据
    console.log(prevProps, prevState);
    // 这一次数据
    console.log(this.props, this.state);
  }
  // 只执行一次 render触发之后
  componentDidMount() {}
  // 销毁
  componentWillUnmount() {}
}

export default LifeTimes;

/**
 * 组件首次渲染会依次触发3个函数 constructor render componentDidMount
 * 其中constructor 和 componentDidMount 整个组件中只执行一次
 * constructor 函数具有一个形参其作用是收集组件的props属性和子节点(props.children) 相当于vue插槽
 * 组件的props/state发生更新时会依次触发 shouldComponentUpdate  render  componentDidUpdate
 * 其中shouldComponentUpdate 这个函数必须具备返回值且类型为boolean 用以控制后续的 render 和 componentDidUpdate 是否执行
 * 如果shouldComponentUpdate 返回false 只是被UI拦截 props/state值依然会变化
 * shouldComponentUpdate 函数具备两个参数 分别是上一次即将更新的props和即将更新的state
 * shouldComponentUpdate 核心功能:性能优化避免不必须的更新render
 *
 */
