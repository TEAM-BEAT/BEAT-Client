import React, { useEffect, useState } from "react";

const KakaoMap = () => {
  const { kakao } = window;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); //다음 번에는 바로 로딩이 되도록 해당 위치에 정의
    if (!isLoaded) {
      //이래야 getElementById가 정상적으로 작동함
      return;
    }
    // 카카오 지도 객체 생성 예제
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 위치
      level: 3, // 초기 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);

    // // 지도에 마커 추가
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
