import cx from "classnames";
import PropTypes from "prop-types";

const BtnTypes = {
  HEART: "heart",
  CROSS: "cross",
};

const BtnIcon = ({ type }) => {
  if (type === BtnTypes.CROSS) return <i className="fa fa-solid fa-xmark"></i>;
  if (type === BtnTypes.HEART) return <i className="fa fa-solid fa-heart"></i>;
  return <></>;
};

const SemiCircleBtn = ({ type, onClick }) => {
  return (
    <button
      className={cx(
        {
          "dislike-btn": type === BtnTypes.CROSS,
          "like-btn": type === BtnTypes.HEART,
        },
        "clean-btn"
      )}
      type="button"
      onClick={onClick}
    >
      <BtnIcon type={type} />
    </button>
  );
};

SemiCircleBtn.propTypes = {
  type: PropTypes.oneOf([BtnTypes.HEART, BtnTypes.CROSS]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export { SemiCircleBtn, BtnTypes };
