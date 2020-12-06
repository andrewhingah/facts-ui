import React from "react";
import {
  Typography as TypographyBase,
  CircularProgress as CircularProgressBase,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";

function Typography({
  children,
  weight,
  size,
  colorBrightness,
  color,
  block,
  uppercase,
  style,
  ...props
}) {
  const theme = useTheme();

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
        textTransform: uppercase ? "uppercase" : "none",
        ...style,
      }}
      component={block ? "div" : "p"}
      {...props}
    >
      {children}
    </TypographyBase>
  );
}

function CircularProgress({ children, color, ...props }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: color
        ? `${getColor(color, theme)} !important`
        : theme.palette.primary.main,
    },
  }));

  const classes = useStyles();

  return (
    <CircularProgressBase classes={{ root: classes.root }} {...props}>
      {children}
    </CircularProgressBase>
  );
}

export { Typography, CircularProgress };

// ########################################################################

function getColor(color, theme, brightness = "main") {
  if (color && theme.palette[color] && theme.palette[color][brightness]) {
    return theme.palette[color][brightness];
  }
}

function getFontWeight(style) {
  switch (style) {
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size, variant = "", theme) {
  let multiplier;

  switch (size) {
    case "sm":
      multiplier = 0.8;
      break;
    case "md":
      multiplier = 1.5;
      break;
    case "xl":
      multiplier = 2;
      break;
    case "xxl":
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  const defaultSize =
    variant && theme.typography[variant]
      ? theme.typography[variant].fontSize
      : theme.typography.fontStyle + "px";

  return `calc(${defaultSize} * ${multiplier})`;
}
