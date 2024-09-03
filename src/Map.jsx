import React, { useEffect, useRef, useState } from 'react';
import './Map.css'; // CSS 파일 import

const Map = () => {
    const [searchInput, setSearchInput] = useState('');
    const mapRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&autoload=false&libraries=services`;
        document.head.appendChild(script);

        script.onload = () => {
            const { kakao } = window;
            if (kakao && kakao.maps) {
                kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new kakao.maps.LatLng(37.5607318, 126.9678439),
                        level: 4,
                    };
                    const map = new kakao.maps.Map(container, options);
                    mapRef.current = map;
                });
            } else {
                console.error("카카오 맵 로드 실패");
            }
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleSearch = () => {
        const { kakao } = window;
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchInput, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const result = data[0];
                const locPosition = new kakao.maps.LatLng(result.y, result.x);
                mapRef.current.setCenter(locPosition);

                const marker = new kakao.maps.Marker({
                    map: mapRef.current,
                    position: locPosition,
                });
            } else {
                alert('검색 결과가 없습니다.');
            }
        });
    };

    return (
        <div className="map-container"> {/* CSS 클래스 적용 */}
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



