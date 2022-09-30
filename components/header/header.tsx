/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-comment-textnodes */
// Nota: Types desactivados ya que lanzan el error aun estan tipados los coponentes
import { Children, useEffect, useState } from "react";
import { TrankInfoModel, UserName } from "../../interfaces";
import { getTrackingInfo } from "../../services/api";
import { TimeTracker } from "./timetracker";
import { UserMenu } from "./user-menu";

export const AppHeader = () => {
  const [entryInfo, setEntryInfo] = useState<TrankInfoModel | null>(null);
  const [workStatus, setWorkStatus] = useState("");

  const getInfo = async (): Promise<void> => {
    const resInfo = await getTrackingInfo();
    setEntryInfo(resInfo);
    setWorkStatus(resInfo.employee.workStatus);
  };

  const updateEntryInfo = (entry: TrankInfoModel): void => {
    setEntryInfo(entry);
    setWorkStatus(entry.employee.workStatus);
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Nota: He separado en dos coponentes, ya que aunque coporten cierta logica, tienen naturalezas distintas y simplemente 
  // he preferido usar una arquitectura padre/hijo para compartir la información entre ellos dos.
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
