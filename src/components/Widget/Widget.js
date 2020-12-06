import React from "react";
import { Paper } from "@material-ui/core";
import classnames from "classnames";
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  subtitle,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  inheritHeight,
  searchField,
  className,
  style,
  ...props
}) {
  var classes = useStyles(props);

  return (
    <div
      className={classnames(
        {
          [classes.inheritHeight]: inheritHeight,
          [classes.widgetWrapper]: !inheritHeight,
        },
        className
      )}
      style={style}
    >
      <Paper
        className={classnames(classes.paper, {
          [props.className]: props.className,
        })}
        classes={{ root: classes.widgetRoot }}
      >
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [classes.paddingTop]: !title && !noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
