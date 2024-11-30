import { IconCheck, KakaoMapArrow } from "@assets/svgs";
import { Toast } from "@components/commons";
import { useToast } from "@hooks";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import beat_map_marker from "../../../../../public/svgs/beat_map_marker.svg";
import { PerformanceImageList } from "../content/Content";
import DetailImage from "../detailImage/DetailImage";
import Contact from "./Contact";
import * as S from "./PerformanceIntroduce.styled";

interface PerformanceIntroduceProps {
  description: string;
  performanceImageList: PerformanceImageList[];
  attentionNote: string;
  contact: string;
  performanceVenue: string;
  roadAddressName: string;
  placeDetailAddress: string;
  latitude: string;
  longtitude: string;
}

type Position = {
  lat: number;
  lng: number;
};

const PerformanceIntroduce = ({
  description,
  performanceImageList,
  attentionNote,
  contact,
  performanceVenue,
  roadAddressName,
  placeDetailAddress,
  latitude,
  longtitude,
}: PerformanceIntroduceProps) => {
  const { kakao } = window;
  const { showToast, isToastVisible } = useToast();
  const [markerPosition, setMarkerPosition] = useState<Position>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<typeof kakao.maps.Map | null>(null);
  const fullAddress = `${roadAddressName} ${placeDetailAddress}`;

  useEffect(() => {
    setMarkerPosition({ lat: Number(latitude), lng: Number(longtitude) });
  }, []);

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  const handleLinkToKakaoMap = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = `https://map.kakao.com/link/map/${performanceVenue},${latitude},${longtitude}`;
    const scheme = `kakaomap://look?p=${latitude},${longtitude}`;

    if (isMobile) {
      window.location.href = scheme;
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Title>공연소개</S.Title>
          <S.Description>{description}</S.Description>
        </S.Container>
        <DetailImage performanceImageList={performanceImageList} />
        <S.MapInfo>
          <S.Title>공연장 정보</S.Title>
          <S.MapDescBox>
            <S.SubTitleWithDesc>
              <S.SubTitle>장소</S.SubTitle>
              <S.Desc>{performanceVenue}</S.Desc>
            </S.SubTitleWithDesc>
            <S.SubTitleWithDesc>
              <S.SubTitle>주소</S.SubTitle>
              <S.Desc>{fullAddress}</S.Desc>
              <S.Copy onClick={() => handleCopyClipBoard(fullAddress || "")}>복사</S.Copy>
            </S.SubTitleWithDesc>
          </S.MapDescBox>
          <S.KakaoMap>
            <Map
              center={markerPosition}
              style={{ width: "32.7rem", height: "18rem", borderRadius: "6px" }}
              level={3}
              onCreate={setMap}
            >
              <MapMarker
                position={markerPosition}
                image={{
                  src: beat_map_marker,
                  size: {
                    width: 30,
                    height: 30,
                  },
                }}
              ></MapMarker>
            </Map>
            <KakaoMapArrow
              width={"18px"}
              height={"18px"}
              style={{
                position: "absolute",
                top: "1.7rem",
                right: "2rem",
                zIndex: "3",
                cursor: "pointer",
              }}
              onClick={handleLinkToKakaoMap}
            />
          </S.KakaoMap>
        </S.MapInfo>
        <S.Divider />
        <S.Container>
          <S.Title>유의사항</S.Title>
          <S.Description>{attentionNote}</S.Description>
        </S.Container>
        <S.Divider />
        <Contact contact={contact} />
      </S.Wrapper>
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
        클립보드에 복사되었습니다!
      </Toast>
    </>
  );
};

export default PerformanceIntroduce;
