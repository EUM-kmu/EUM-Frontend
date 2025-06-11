import { Dispatch, SetStateAction, FC } from "react";
import CameraModule from "react-html5-camera-photo";
import { styled } from "styled-components";

import { devLog } from "@/utils/dev-log";

import "react-html5-camera-photo/build/css/index.css";
import "./camera.css";

interface OriginCameraProps {
  isImageMirror?: boolean;
  onTakePhotoAnimationDone: (dataUri: string) => void;
  imageType?: string;
  imageCompression?: number;
}

const OriginCamera = (CameraModule.default ?? CameraModule) as FC<OriginCameraProps>;

type CameraProps = {
  setDataUri: Dispatch<SetStateAction<string>>;
};

const Camera = ({ setDataUri }: CameraProps) => {
  function handleTakePhoto(dataUri: string) {
    devLog("takePhoto");
    devLog(dataUri);
  }

  return (
    <CameraWrapper>
      <OriginCamera
        isImageMirror
        onTakePhotoAnimationDone={(dataUri) => {
          handleTakePhoto(dataUri);
          setDataUri(dataUri);
        }}
        imageType="jpg"
        imageCompression={0.5}
      />
    </CameraWrapper>
  );
};

export default Camera;

const CameraWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  & img {
    width: 100% !important;
    aspect-ratio: 1;
    object-fit: cover;
  }

  & #container-circles {
    & .is-clicked {
      margin: -22px 0 0 -22px;
    }
  }

  & #outer-circle {
    background-color: #f17547;
  }

  & #inner-circle {
    position: absolute;
    width: 65px;
    height: 65px;
    left: 27px;
    top: 26px;

    &::after {
      position: absolute;
      content: "";
      width: 50px;
      height: 50px;
      left: 8px;
      top: 8px;
      background-color: #f17547;
      border-radius: 100%;
      z-index: 3;

      &:active {
      }
    }
  }
`;