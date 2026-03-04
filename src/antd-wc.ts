import r2wc from '@r2wc/react-to-web-component';
import { Button, Tag, Rate, Select, Input, Switch, ConfigProvider } from 'antd';
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
  return (props: any) => {
    // Map customStyle to style to avoid conflicts with native HTML style attribute in Vue
    const { customStyle, ...rest } = props;
    const finalProps = customStyle ? { ...rest, style: customStyle } : rest;
    
    return React.createElement(
      ConfigProvider,
      { theme: themeConfig, prefixCls: 'feb' },
      React.createElement(Component, finalProps, finalProps.text) // passing props.text as children for components that use it
    );
  };
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

// Select wrapper
const WebAntSelect = r2wc(withTheme(Select), {
  props: {
    options: "json",
    value: "string",
    defaultValue: "string",
    placeholder: "string",
    disabled: "boolean",
    allowClear: "boolean",
    customStyle: "json"
  }
});
customElements.define('ant-select', WebAntSelect);

// Input wrapper
const WebAntInput = r2wc(withTheme(Input), {
  props: {
    value: "string",
    defaultValue: "string",
    placeholder: "string",
    disabled: "boolean",
    allowClear: "boolean",
    type: "string",
    customStyle: "json"
  }
});
customElements.define('ant-input', WebAntInput);

// Switch wrapper
const WebAntSwitch = r2wc(withTheme(Switch), {
  props: {
    checked: "boolean",
    defaultChecked: "boolean",
    disabled: "boolean",
    size: "string"
  }
});
customElements.define('ant-switch', WebAntSwitch);
