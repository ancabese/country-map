import { Country } from "@/interfaces/Country";
import { FC } from "react";
import { Popup } from "react-leaflet";
import styles from "./MarkerPopup.module.css";

const MarkerPopup: FC<{
  countryData: Country | undefined;
}> = ({ countryData }) => {
  return (
    <Popup>
      {countryData && (
        <div className={styles.contents}>
          <h2>{countryData.name}</h2>
          <h3 style={{ color: "gray" }}>{countryData.native}</h3>
          <p>Capital: {countryData.capital}</p>
          <p>Flag: {countryData.emoji}</p>
          <p>Currency: {countryData.currency}</p>
          <p>
            Languages:{" "}
            {countryData.languages.map((lang) => lang.name).join(", ")}
          </p>
        </div>
      )}
    </Popup>
  );
};

export default MarkerPopup;
