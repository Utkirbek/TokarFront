import { Text, TextProps } from "@mantine/core";
import React, { memo } from "react";

interface TextEllipsisProps {
  text: string;
  maxChars?: number;
  maxLines?: number;
  ellipsis?: string;
}

const TextEllipsis: React.FC<TextEllipsisProps & TextProps> = ({
  text,
  maxChars = 100,
  maxLines = 1,
  ellipsis = "...",
  ...props
}) => {
  return (
    <Text
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        maxWidth: `${maxChars}ch`,
      }}
      {...props}
    >
      {text}
    </Text>
  );
};

export default memo(TextEllipsis);
