import React from "react";

interface ContentEditableProps {
  value: string | number;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  component?: string;
  style?: React.CSSProperties;
  onFinish?: (val: number | string) => void;
}

const ContentEditable = React.forwardRef<HTMLElement, ContentEditableProps>(
  (
    {
      value,
      onChange,
      className,
      placeholder,
      disabled,
      component,
      style,
      onFinish,
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
      onChange?.(e.target.innerText);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (onFinish) onFinish(e.target.innerText);
    };

    return React.createElement(
      component || "span",
      {
        ref,
        className,
        contentEditable: !disabled,
        suppressContentEditableWarning: true,
        onInput: handleChange,
        placeholder,
        style,
        onBlur: handleBlur,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        },
        onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        },
      },
      value
    );
  }
);

ContentEditable.displayName = "ContentEditable";

export default ContentEditable;
