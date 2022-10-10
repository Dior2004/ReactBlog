import { useEffect, useState } from "react";

// custom hook

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  }); // starting condition an object

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        // setting our useState object
        width: window.innerWidth, // gets the width of our window
        height: window.innerHeight, // gets the height of our window
      });
    };

    handleResize(); //calling the function at load time so we need the following thing...

    window.addEventListener("resize", handleResize); // dis does the work but this will take up much space in memory so we need ...

    /*    const cleanUp = () => {
      console.log("runs if dep changes");
      window.removeEventListener("resize", handleResize);
    }; // this is the only way of chnging the dependency

    return cleanUp; // last thing to do in the function */

    return () => window.removeEventListener("resize", handleResize);
  }, []); // runs at load time only but we need it to work every time the window is resized and here cleanUp comes in handy

  return windowSize;
};

export default useWindowSize;
