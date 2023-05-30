import { FC } from "react";
import styles from "./InfoBox.module.css";
import { ApolloError } from "@apollo/client";

const InfoBox: FC<{
  isoLoading: boolean;
  dataLoading: boolean;
  isoError: string | null;
  dataError: ApolloError | undefined;
}> = ({ isoLoading, dataLoading, isoError, dataError }) => {
  return (
    <div className={styles.info}>
      {isoLoading && <p>Loading country ISO...</p>}
      {dataLoading && <p>Loading country data...</p>}
      {isoError && <p>{isoError}</p>}
      {dataError && <p>{dataError.message}</p>}
    </div>
  );
};

export default InfoBox;
