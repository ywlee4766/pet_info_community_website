import { useState, useEffect } from "react";

import styled from "styled-components";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import Header from "../components/common/Header";
import List from "../components/map/List";

import { Container, Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const MapPage = () => {
  const [value, setValue] = useState("1");
  const [places, setPlaces] = useState([]);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [currentPos, setCurrentPos] = useState();
  const [pagination, setPagination] = useState();

  const { kakao } = window;
  const keywords = {
    1: "공원",
    2: "애견 카페",
    3: "애견 미용",
    4: "동물 병원",
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMouseOver = (content) => {
    setInfo({ content: content });
  };
  const handleMouseOut = () => {
    setInfo({ content: "" });
  };

  const displayPagination = () => {
    let result = [];
    for (let i = 1; i <= pagination?.last; i++) {
      result.push(
        <PageNumber
          key={i}
          href="#"
          onClick={() => {
            pagination.gotoPage(i);
          }}
          className={i === pagination.current ? "on" : null}
        >
          {i}
        </PageNumber>
      );
    }
    return result;
  };

  function success(pos) {
    const { coords } = pos; // coords: 위치 정보
    const latitude = coords.latitude; // 위도
    const longitude = coords.longitude; // 경도

    setCurrentPos({ lat: latitude, lng: longitude });
  }

  function fail(pos) {
    alert("위치 정보를 가져오는데 실패했습니다.");
    setCurrentPos({
      lat: 33.450701,
      lng: 126.570667,
    });
  }

  function getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail); // 성공, 실패 콜백 함수 등록
    } else {
      alert("GPS를 지원하지 않습니다.");
    }
  }

  useEffect(() => {
    getMyLocation();
  }, []);

  useEffect(() => {
    if (!map) return;
    if (!currentPos.lat || !currentPos.lng) return;

    const ps = new kakao.maps.services.Places();

    const keyword = keywords[value];

    const searchOptions = {
      location: new kakao.maps.LatLng(currentPos.lat, currentPos.lng), // 중심 좌표
      radius: 10000, // 중심 좌표로부터의 거리(반경) 필터링 값 (미터(m) 단위)
      size: 5, // 한 페이지에 보여질 목록 개수
    };

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {
      setPlaces(data);

      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);

        // 페이지 번호를 표출합니다
        setPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    };

    ps.keywordSearch(keyword, placesSearchCB, searchOptions);
  }, [map, currentPos, value]);

  // const displayTabPanel = () => {
  //   return <displayTabPanel value={value}>{value}</displayTabPanel>;
  // };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: "90px" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="map tab list">
                <Tab label="산책길" value="1" />
                <Tab label="카페" value="2" />
                <Tab label="미용" value="3" />
                <Tab label="병원" value="4" />
              </TabList>
            </Box>
            <TabPanel value={value}>
              <Grid container>
                <Grid item md={6} sm={12} xs={12}>
                  {currentPos?.lat && currentPos?.lng && (
                    <Map
                      center={{ lat: currentPos.lat, lng: currentPos.lng }}
                      style={{ width: "100%", height: "400px" }}
                      onCreate={setMap}
                      isPanto={true}
                    >
                      {markers.map((marker) => (
                        <MapMarker
                          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                          position={marker.position}
                          onMouseOver={() => {
                            handleMouseOver(marker.content);
                          }}
                          onMouseOut={handleMouseOut}
                        >
                          {info && info.content === marker.content && (
                            <div style={{ color: "#000" }}>
                              {marker.content}
                            </div>
                          )}
                        </MapMarker>
                      ))}
                    </Map>
                  )}
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <List
                    places={places}
                    handleMouseOver={handleMouseOver}
                    handleMouseOut={handleMouseOut}
                  />
                  <PageNumberWrapper>{displayPagination()}</PageNumberWrapper>
                </Grid>
              </Grid>
            </TabPanel>
            {/* <TabPanel value="2">카페</TabPanel>
            <TabPanel value="3">미용</TabPanel>
            <TabPanel value="4">식당</TabPanel>
            <TabPanel value="5">병원</TabPanel> */}
            {/* {displayTabPanel()} */}
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default MapPage;

const PageNumber = styled.a`
  text-decoration: none;
  color: black;
  padding: 10px;

  &.on {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const PageNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
