import React from "react";
import PropTypes from "prop-types";
import { ICONS } from "./Icons";

interface IProps {
  icon: string;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Icon = (props: IProps) => {
  const { icon, color, width, height, className } = props;
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={ICONS[icon].viewBox}
    >
      <path d={ICONS[icon].path} fill={color ? color : "#B2B6BA"} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

Icon.defaultProps = {
  width: 22,
  height: 22,
};

export default Icon;
