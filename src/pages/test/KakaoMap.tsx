import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import banner_basic from "@assets/images/banner_basic.png";
import icon_toss_svg from "../../../public/svgs/icon_toss.svg";

type Position = {
  lat: number;
  lng: number;
};

type Marker = {
  position: Position;
  content: string;
};

const KakaoMap = () => {
  const { kakao } = window;
  const [info, setInfo] = useState<Marker | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([
    {
      position: {
        lat: 37.5494796485918,
        lng: 126.924854360345,
      },
      content: "테스트",
    },
  ]);
  const [map, setMap] = useState<typeof kakao.maps.Map | null>(null);
  const [location, setLocation] = useState<Position>({ lat: 37.566826, lng: 126.9786567 });

  useEffect(() => {
    if (!map) {
      return;
    }
    const ps = new kakao.maps.services.Places();

    // ps.keywordSearch("홍익대학교 제2기숙사", (data, status, _pagination) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     const bounds = new kakao.maps.LatLngBounds();
    //     console.log("bounds:", bounds);
    //     const markers = [];

    //     for (var i = 0; i < data.length; i++) {
    //       console.log(data[i]);
    //       // @ts-ignore
    //       markers.push({
    //         position: {
    //           lat: data[i].y,
    //           lng: data[i].x,
    //         },
    //         content: data[i].place_name,
    //       });
    //       // @ts-ignore
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }
    //     setMarkers(markers);

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    //   }
    // });

    //테스트로, 처음 위치 직접 지정
    setLocation({ lat: 37.5494796485918, lng: 126.924854360345 });
  }, [map]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: location.lat,
        lng: location.lng,
      }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => {
        console.log(marker);
        return (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
            image={{
              src: icon_toss_svg,
              size: {
                width: 30,
                height: 30,
              },
            }}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        );
      })}
    </Map>
  );
};

export default KakaoMap;
