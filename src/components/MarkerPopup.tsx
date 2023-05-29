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
        <div className={styles.popup}>
          <div className={styles.header}>
            <div className={styles.flag}>{countryData.emoji}</div>
            <div>
              <h2>{countryData.name}</h2>
              <h3 style={{ color: "gray" }}>{countryData.native}</h3>
            </div>
          </div>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Capital</td>
                <td>{countryData.capital}</td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>{countryData.currency}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>
                  {countryData.languages.map((lang) => lang.name).join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Popup>
  );
};

export default MarkerPopup;
