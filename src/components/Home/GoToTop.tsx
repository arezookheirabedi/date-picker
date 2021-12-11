import React from "react";

// packages
import {Link as InnerLink} from "react-scroll";

// svg images
import Svg from "../Svg";

const GoToTop = () => {

  const {GoToTopSvg} = Svg;

  return (
    <>
      <div id="top"/>
      <div className="go-to-top d-none">
        <InnerLink to="top" smooth>
          <GoToTopSvg/>
        </InnerLink>
      </div>
    </>
  );
};

export default GoToTop;
