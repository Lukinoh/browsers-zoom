import r2wc from '@r2wc/react-to-web-component';
import { Button, Tag, Rate, ConfigProvider } from 'antd';
import React from 'react';

// Theme configuration to show it works globally on these components
const themeConfig = {
  token: {
    colorPrimary: '#ff00ff', // Pink color to clearly show custom theme
    borderRadius: 8, // Rounder corners
  }
};

// HOC to inject the theme provider
const withTheme = (Component: React.ElementType) => {
  return (props: any) => React.createElement(
    ConfigProvider,
    { theme: themeConfig, prefixCls: 'feb' },
    React.createElement(Component, props, props.text) // passing props.text as children for components that use it
  );
};

// Button wrapper
const WebAntButton = r2wc(withTheme(Button), {
  props: {
    type: "string",
    danger: "boolean",
    ghost: "boolean",
    block: "boolean",
    text: "string"
  }
});
customElements.define('ant-button', WebAntButton);

// Tag wrapper
const WebAntTag = r2wc(withTheme(Tag), {
  props: {
    color: "string",
    text: "string"
  }
});
customElements.define('ant-tag', WebAntTag);

// Rate wrapper
const WebAntRate = r2wc(withTheme(Rate), {
  props: {
    allowHalf: "boolean",
    value: "number"
  }
});
customElements.define('ant-rate', WebAntRate);
