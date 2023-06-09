import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import MapConsumer from "./MapConsumer";
import styles from "./Map.module.css";
import { INIT_MARKER_COORDS, INIT_ZOOM } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import { LatLng, Marker as LeafletMarker, LeafletMouseEvent } from "leaflet";
import { Coordinates } from "../interfaces/Coordinates";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../queries/getCountry";
import useHttp from "../hooks/useHttp";
import { getCountryIsoRequestConfig } from "../utils/getCountryIsoRequestConfig";
import InfoBox from "./InfoBox";

const Map = () => {
  const [markerCoords, setMarkerCoords] =
    useState<Coordinates>(INIT_MARKER_COORDS);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const { lat: markerLat, lng: markerLng } = markerCoords;

  const {
    isLoading: isoLoading,
    error: isoError,
    sendRequest: fetchCountryIso,
  } = useHttp();

  const {
    loading: dataLoading,
    error: dataError,
    data: countryData,
  } = useQuery(GET_COUNTRY, { variables: { countryCode }, skip: !countryCode });

  const markerRef = useRef<LeafletMarker>(null);

  useEffect(() => {
    if (markerCoords) {
      const onCountryIsoFetched = (isoCode: any) => {
        const newCountryCode =
          isoCode?.features[0]?.properties?.country_code?.toUpperCase();
        setCountryCode(newCountryCode || null);
        if (countryCode === newCountryCode) {
          showMarkerPopup(true);
        }
      };
      fetchCountryIso(
        getCountryIsoRequestConfig(markerLat, markerLng),
        onCountryIsoFetched
      );
    }
  }, [markerLat, markerLng]);

  useEffect(() => {
    countryData && showMarkerPopup(true);
  }, [countryData]);

  const showMarkerPopup = (show: boolean) => {
    const marker = markerRef.current;
    if (marker) {
      if (show) {
        marker.openPopup();
      } else {
        marker.closePopup();
      }
    }
  };

  const mapClickHandler = (coords: LatLng) => {
    showMarkerPopup(false);
    const markerCoords = {
      lat: coords.lat,
      lng: coords.lng,
    } as Coordinates;
    setMarkerCoords(markerCoords);
  };

  const markerClickHandler = (e: LeafletMouseEvent) => {
    if (!countryCode) {
      showMarkerPopup(false);
    }
  };

  const showInfoBox = isoLoading || dataLoading || isoError || dataError;

  return (
    <MapContainer
      className={styles.map}
      center={INIT_MARKER_COORDS}
      zoom={INIT_ZOOM}
    >
      {showInfoBox && (
        <InfoBox
          isoLoading={isoLoading}
          dataLoading={dataLoading}
          isoError={isoError}
          dataError={dataError}
        />
      )}
      <MapConsumer onClick={mapClickHandler} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerCoords && (
        <Marker
          ref={markerRef}
          position={markerCoords}
          eventHandlers={{
            click: markerClickHandler,
          }}
        >
          <MarkerPopup countryData={countryData?.country} />
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
