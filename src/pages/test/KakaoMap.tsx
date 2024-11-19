import React, { useEffect, useState } from "react";

const useLoadKakaoMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadKakaoSDK = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
          return;
        }
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&libraries=services,clusterer,drawing`;
        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            resolve(window.kakao);
          } else {
            reject(new Error("Kakao SDK 로드 실패"));
          }
        };
        script.onerror = () => reject(new Error("Kakao SDK 로드 실패"));
        document.head.appendChild(script);
      });
    };

    loadKakaoSDK()
      .then(() => setIsLoaded(true))
      .catch((error) => console.error(error));
  }, []);

  return isLoaded;
};

const KakaoMap = () => {
  const isLoaded = useLoadKakaoMap();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const { kakao } = window;

    // kakao.maps.LatLng 확인
    console.log(kakao.maps); // 제대로 로드되었는지 확인
    console.log(kakao.maps.LatLng);
    console.log(kakao.maps.Map);

    // if (!kakao.maps.LatLng) {
    //   console.error("kakao.maps.LatLng is not available.");
    //   return;
    // }

    // 카카오 지도 객체 생성 예제
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 위치
      level: 3, // 초기 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);

    // 지도에 마커 추가
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.5665, 126.978),
    });
    marker.setMap(map);
  }, [isLoaded]);

  return (
    <div>
      {isLoaded ? (
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default KakaoMap;
