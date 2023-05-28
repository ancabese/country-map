import { LatLng } from "leaflet";
import { FC } from "react";
import { useMapEvents } from "react-leaflet";

const MapConsumer: FC<{
  onClick?: (data: LatLng) => void;
  onZoomEnd?: (zoom: number) => void;
}> = ({ onClick, onZoomEnd }) => {
  const map = useMapEvents({
    click: (e) => onClick?.(e.latlng),
    zoomend: () => onZoomEnd?.(map.getZoom()),
  });
  return null;
};

export default MapConsumer;
