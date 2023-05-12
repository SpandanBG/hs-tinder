import cx from "classnames";
import PropTypes from "prop-types";

const BtnTypes = {
  HEART: "heart",
  CROSS: "cross",
};

const BtnIcon = ({ type }) => {
  if (type === BtnTypes.CROSS) return <i className="fa fa-solid fa-times"></i>;
  if (type === BtnTypes.HEART) return <i className="fa fa-solid fa-heart"></i>;
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
