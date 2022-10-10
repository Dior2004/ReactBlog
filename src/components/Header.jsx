import React from "react";
import {
  MdOutlinePhoneIphone,
  MdOutlineTabletMac,
  MdOutlineLaptopMac,
} from "react-icons/md";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import useWindowSize from "../hooks/useWindowSize"; // importing the custom hook from hooks folder

const Header = () => {
  const { title } = useContext(DataContext);

  // const useWindowSizeObj = useWindowSize();  // this is a function like we have created in earlier in the hooks directory
  // console.log(useWindowSizeObj); // is an object with width and heigth propertirs like {width: undefined, height: undefined}
  // we can select a specific element following like this ...
  const { width } = useWindowSize(); // result is going to be width value that is changing accordingly

  return (
    <header>
      <div className="wrap">
        <div>
          <h1>React JS | {title}</h1>
        </div>
        <i>
          {width < 700 ? (
            <MdOutlinePhoneIphone />
          ) : width < 1000 ? (
            <MdOutlineTabletMac />
          ) : (
            <MdOutlineLaptopMac style={{ fontSize: 38, marginBottom: -5 }} />
          )}
        </i>
      </div>
    </header>
  );
};

export default Header;
