/**
 * Resources
 * - https://docs.mux.com/guides/video/play-your-videos
 */

import getVideoID from "get-video-id";
import React, { LegacyRef, memo, useEffect, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

type YoutubeProps = {
  src: string;
};

type Youtubeplayer = LegacyRef<YouTube> | undefined;

const opts: any = {
  playerVars: {
    autoplay: 0,
    controls: 1, // turn off yt controls
    showinfo: 0, // Hide the video title
    disablekb: 1, // prevent keyboard controls
    enablejsapi: 1, // allow the player to be controlled by the api
    autohide: 1,

    playsinline: 1, // inline on iOS
    rel: 0, // show only more-content of the channel
    modestbranding: 1, // prevent logo
    version: 3,
    playerapiid: "iframe_P1",
    wmode: "transparent",
    iv_load_policy: 3,
    cc_load_policy: 0,
    html5: 1,
    widgetid: 1,
  },
};

const StyledWrapper = styled.div`
  iframe {
    width: 100%;
  }
`;

function YoutubePlayer({ src }: YoutubeProps) {
  const [youtubePlayer, setYoutubePlayer] = useState<Youtubeplayer | null>(
    null
  );

  const handleReady = (e: any) => {
    const player = e.target;
    player.pauseVideo();

    setYoutubePlayer(player);
  };

  useEffect(() => {
    if (youtubePlayer) {
      setYoutubePlayer(null);
    }
  }, [src]);

  return (
    <StyledWrapper className="overflow-hidden rounded-[8px]">
      {src && (
        <YouTube
          id="player"
          className="h-full w-full"
          ref={youtubePlayer}
          videoId={getVideoID(src).id ?? ""}
          // onStateChange={handleStateChange}
          onReady={handleReady}
          opts={opts}
        />
      )}
    </StyledWrapper>
  );
}

export default memo(YoutubePlayer);
