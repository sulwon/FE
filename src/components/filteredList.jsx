const FilteredList = ({ filteredData }) => {
  useEffect(() => {
    // 카카오맵 API를 사용하여 지도에 데이터를 표시합니다.
    // 예제 코드 (카카오맵 API 사용 방법에 따라 수정 필요)
    const { kakao } = window;
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    filteredData.forEach(item => {
      const markerPosition = new kakao.maps.LatLng(item.latitude, item.longitude);
      new kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });
    });
  }, [filteredData]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default FilteredList;
