import { track } from "../track/track";
import React from "react";

interface TrackProviderProps {
  children: React.ReactNode;
}

export default function TrackProvider({ children }: TrackProviderProps) {
  React.useEffect(() => {
    track.initialize();
  }, []);

  return <>{children}</>;
}
