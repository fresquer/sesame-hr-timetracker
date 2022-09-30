import { useRef, useState } from "react";
import { TrankInfoModel, UserName } from "../../interfaces";

type Props = {
  trackingInfo: TrankInfoModel;
  workStatus: string;
  children: React.ReactNode;
};

export const UserMenu = ({ trackingInfo, workStatus }: Props) => {
  const [dropdownLvl1, setDropdownLvl1] = useState(false);

  const handleMouseOver = (state: boolean) => {
    setDropdownLvl1(state);
  };

  return (
    <>
      <div className="usermenu_wrapper flex">
        <div className="avatar_wrapper">
          <img src="./img/avatar.png" alt="avatar" />
          {workStatus === "online" && (
            <img
              src="./img/conected-indicator.svg"
              alt="indicator"
              className="conectedIndicator"
            />
          )}
        </div>
        <div className="name_wrapper">
          <p>{`${trackingInfo?.employee?.firstName} ${trackingInfo?.employee?.lastName}`}</p>
        </div>
        <div
          className="downArrow_wrapper"
          onMouseOver={(e) => handleMouseOver(true)}
        >
          <img
            src="./img/down-arrow.svg"
            alt="down arrow"
            className="arrowMenu"
          />
        </div>
      </div>
      {dropdownLvl1 && (
        <SubMenuLvl1
          handleMouseOver={(e: boolean) => handleMouseOver(e)}
        ></SubMenuLvl1>
      )}
    </>
  );
};

type PropsLvl1 = {
  handleMouseOver: Function;
};

export const SubMenuLvl1 = ({ handleMouseOver }: PropsLvl1) => {
  const [dropdownLvl2, setDropdownLvl2] = useState(false);

  const handleMouseOverLvl2 = (state: boolean) => {
    setDropdownLvl2(state);
    handleMouseOver(true);
  };

  return (
    <div
      className="sub_menu lvl1"
      onMouseLeave={() => {
        handleMouseOverLvl2(false);
        handleMouseOver(false);
      }}
    >
      <img
        src="./img/white-triangle.svg"
        alt="down arrow"
        className="whiteTrinagle"
      />
      <div
        className="sub_menu_item flex"
        onMouseOver={(e) => handleMouseOverLvl2(true)}
      >
        <span>
          <img
            src="./img/down-arrow.svg"
            alt="down arrow"
            className="arrowMenu"
          />
          Mis cuentas
        </span>
        {dropdownLvl2 && (
          <SubMenuLvl2
            handleMouseOverLvl2={(state: boolean) => handleMouseOverLvl2(state)}
          ></SubMenuLvl2>
        )}
      </div>
      <div
        className="sub_menu_item flex"
        onMouseOver={() => handleMouseOverLvl2(false)}
      >
        <span>Vista empleado</span>
      </div>
      <div
        className="sub_menu_item flex"
        onMouseOver={() => handleMouseOverLvl2(false)}
      >
        <span>Mi perfil</span>
      </div>
      <div
        className="sub_menu_item flex"
        onMouseOver={() => handleMouseOverLvl2(false)}
      >
        <span>Cerrar sesión</span>
      </div>
    </div>
  );
};

type PropsLvl2 = {
  handleMouseOverLvl2: Function;
};

export const SubMenuLvl2 = ({ handleMouseOverLvl2 }: PropsLvl2) => {
  return (
    <div
      className="sub_menu lvl2"
      onMouseOver={(e) => handleMouseOverLvl2(true)}
      onMouseLeave={() => handleMouseOverLvl2(false)}
    >
      <div className="sub_menu_item account_item flex">
        <div className="img_wrapper">
          <img src="./img/sub-menu-circle.svg" alt="avatar" />
        </div>
        <div className="info">
          <p className="name">
            <b>Sesame1</b> Kelly Pierce
          </p>
          <div className="time">Hoy llevas 00:00</div>
        </div>
      </div>
      <div className="sub_menu_item account_item flex">
        <div className="img_wrapper">
          <img src="./img/sub-menu-circle.svg" alt="avatar" />
        </div>
        <div className="info">
          <p className="name">
            <b>Sesame1</b> Kelly Pierce
          </p>
          <div className="time">Hoy llevas 00:00</div>
        </div>
      </div>
    </div>
  );
};
