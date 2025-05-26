import { track } from "../track/track";
import React from "react";

interface TrackProviderProps {
  children: React.ReactNode;
}

export default function TrackProvider({ children }: TrackProviderProps) {
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      await track.initialize();
      setIsInitialized(true);
    };
    init();
  }, []);

  if (!isInitialized) {
    return;
  }

  return <>{children}</>;
}
