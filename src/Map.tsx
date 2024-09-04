import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './map.css';

interface Marker {
  setMap: (map: any | null) => void;
}

const Map: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isKakaoLoaded, setIsKakaoLoaded] = useState<boolean>(false);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5607318, 126.9678439),
          level: 4,
        };
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;
        setIsKakaoLoaded(true);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const handleSearch = async () => {
    if (!isKakaoLoaded) {
      console.log("Kakao Maps API is not loaded yet");
      return;
    }

    try {
      const response = await axios.get('/api/map/search', { params: { keyword: searchInput } });
      const data = response.data.documents[0];

      clearMarkers();

      const { kakao } = window as any;
      const locPosition = new kakao.maps.LatLng(data.y, data.x);
      mapRef.current.setCenter(locPosition);

      const imageSize = new kakao.maps.Size(36, 43);
      const imageOption = { offset: new kakao.maps.Point(18, 43) };
      const markerImage = new kakao.maps.MarkerImage('marker.png', imageSize, imageOption);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: locPosition,
        image: markerImage,
      });

      setMarkers(prevMarkers => [...prevMarkers, marker]);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('검색 결과가 없습니다.');
    }
  };

  return (
    <div className="map-container">
      <div className="search-box">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="주소를 입력해주세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default Map;
