import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import Like from '../../vid/Like.svg';
import Liked from '../../vid/Liked.svg'
import Dislike from '../../vid/Dislike.svg';


const BtnTypes = {
  HEART: "heart",
  CROSS: "cross",
};


const SemiCircleBtn = ({ type, btnRef }) => {

  const [isLiked, setLiked] = useState(false)

  const BtnIcon = ({ type }) => {
    if (type === BtnTypes.CROSS) return <img src={Dislike} />
    if (type === BtnTypes.HEART){
      if(isLiked){
        return <img src={Liked} />
      }else{
        return <img src={Like} />
      }
    } 
    return <></>;
  };


  return (
    <button
      ref={btnRef}
      onClick={type === BtnTypes.HEART ? setLiked : () => { }}
      className={cx("clean-btn", "react-btn-common", {
        "dislike-btn": type === BtnTypes.CROSS,
        "like-btn": type === BtnTypes.HEART,
      })}
      type="button"
    >
      <BtnIcon type={type} />
    </button>
  );
};

SemiCircleBtn.propTypes = {
  type: PropTypes.oneOf([BtnTypes.HEART, BtnTypes.CROSS]).isRequired,
  btnRef: PropTypes.object.isRequired,
};

export { SemiCircleBtn, BtnTypes };
