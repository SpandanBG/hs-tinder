import cx from "classnames";
import PropTypes from "prop-types";
import Like from '../../vid/Like.svg';
import Dislike from '../../vid/Dislike.svg';


const BtnTypes = {
  HEART: "heart",
  CROSS: "cross",
};

const BtnIcon = ({ type }) => {
  if (type === BtnTypes.CROSS) return <img src={Dislike} />
  if (type === BtnTypes.HEART) return <img src={Like} />
  return <></>;
};

const SemiCircleBtn = ({ type, btnRef }) => {
  return (
    <button
      ref={btnRef}
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
