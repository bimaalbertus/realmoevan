import Router from "./container/Router.js";
import React, { Component } from "react";
import { QueryParamProvider } from "use-query-params";
import "./App.css";
import styled from "styled-components";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App({ src }) {
console.clear();
  
  return (
    <QueryParamProvider>
      <Router />
    </QueryParamProvider>
  );
}

export default App;
