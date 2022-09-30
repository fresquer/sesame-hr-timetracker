/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Children, useEffect, useState } from "react";
import { TrankInfoModel, UserName } from "../../interfaces";
import { getTrackingInfo } from "../../services/api";
import { calculateTime } from "../../util/time-utils";
import { TimeTracker } from "./timetracker";
import { UserMenu } from "./user-menu";

export const AppHeader = () => {
  const [entryInfo, setEntryInfo] = useState<TrankInfoModel | null>(null);
  const [workStatus, setWorkStatus] = useState("");

  const getInfo = async () => {
    const resInfo = await getTrackingInfo();
    // console.log("🚀 ~ file: header.tsx ~ line 14 ~ getInfo ~ resInfo", resInfo.data[0])
    setEntryInfo(resInfo);
    console.log("🚀 ~ file: header.tsx ~ line 18 ~ getInfo ~ resInfo", resInfo);
    setWorkStatus(resInfo.employee.workStatus);
    // calculateTime(resInfo.data[0].workEntryIn.date, resInfo.data[0].workEntryOut.date)
  };

  const updateEntryInfo = (entry: TrankInfoModel) => {
    console.log(
      "🚀 ~ file: header.tsx ~ line 23 ~ updateEntryInfo ~ entry",
      entry
    );
    setEntryInfo(entry);
    setWorkStatus(entry.employee.workStatus);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <header>
      <div className="wrapper">
        {entryInfo ? (
          <>
            <TimeTracker
              trackingInfo={entryInfo}
              updateEntryInfo={(entry: TrankInfoModel) => updateEntryInfo(entry)} children={undefined}></TimeTracker>
            <UserMenu
              trackingInfo={entryInfo}
              workStatus={workStatus} children={undefined}></UserMenu>
          </>
        ) : (
          <p className="loading">Cargando datos</p>
        )}
      </div>
    </header>
  );
};
