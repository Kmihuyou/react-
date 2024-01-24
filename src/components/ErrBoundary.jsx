import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // 可以将错误日志上报给服务器
    console.log(error.message);
    console.log(info.componentStack);
  }
  render() {
    return this.state.hasError ? <h1>出现错误</h1> : this.props.children;
  }
}
export default ErrorBoundary;
