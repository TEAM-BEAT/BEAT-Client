import React from "react";
import { TRACK_EVENTS } from "src/track/constants/events";
import { trackEvent } from "src/track/track";

type TrackingProps = {
  event: keyof typeof TRACK_EVENTS;
  properties?: Record<string, unknown>;
  children: React.ReactElement;
  disabled: boolean;
};

export const Tracking = ({ event, properties = {}, children, disabled }: TrackingProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    trackEvent(TRACK_EVENTS[event], properties);

    // children onClick 이벤트
    if (children.props.onClick && typeof children.props.onClick === "function") {
      children.props.onClick(e);
    }
  };

  return React.cloneElement(children, {
    onClick: handleClick,
  });
};
