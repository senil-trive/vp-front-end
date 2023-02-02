import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IoIosPlay } from "react-icons/io";

import { H3, P } from "../../typography/Typography";
import IconButton from "../../buttons/IconButton/IconButton";
import Tag from "../../buttons/Tag/Tag";

type Props = {
  title: string;
  subtitle?: string;
  src: string;
};

const StyledFigure = styled.figure`
  background: #b8b8b8;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  min-height: 624px;
  height: 100%;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  figcaption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 32px;
    color: white;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 100%
    );

    h3,
    h4,
    h5,
    h6,
    p {
      color: inherit;
    }
  }
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  top: calc(50% - 90px);
  left: calc(50% - 90px);
  transform: translate(calc(-50% + 90px), calc(-50% + 90px));
`;

const placeholderUrl =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoItem({
  title,
  subtitle,
  src = placeholderUrl,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>;

  const handlePlayPause = () => {
    const player = videoRef.current;

    if (player && !isPlaying) {
      player.play();
      setIsPlaying(true);
    } else if (player) {
      player.pause();
      setIsPlaying(false);
    }
  };

  const stopVideo = () => {
    const player = videoRef.current;
    if (isPlaying && player) {
      player.pause();
      setIsPlaying(() => false);
    }
  };

  return (
    <StyledFigure>
      <video
        src={src}
        ref={videoRef}
        controls={isPlaying}
        onClick={stopVideo}
      ></video>
      {!isPlaying && (
        <>
          <PlayIconWrapper onClick={handlePlayPause}>
            <IconButton Icon={IoIosPlay} />
          </PlayIconWrapper>
          <figcaption>
            <H3>{title}</H3>
            {!!subtitle && <P>{subtitle}</P>}
          </figcaption>
        </>
      )}
    </StyledFigure>
  );
}
