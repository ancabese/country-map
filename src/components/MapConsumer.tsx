import { LatLng } from "leaflet";
import { FC } from "react";
import { useMapEvents } from "react-leaflet";

const MapConsumer: FC<{
  onClick: (data: LatLng) => void;
}> = ({ onClick }) => {
  const map = useMapEvents({
    click: (e) => onClick(e.latlng),
  });
  return null;
};

export default MapConsumer;
