import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import Hammer from "react-hammerjs";

const Card = ({ title, zIndex, killCallback }) => {
  const [cardId] = useState(`card-${zIndex}`);

  const onXSwipeHandler = useCallback(({ deltaX, deltaTime }) => {
    anime({
      targets: `#${cardId}`,
      translateX: (deltaX < 0 ? -1 : 1) * window.screen.width,
      duration: deltaTime * 6,
      easing: "easeInOutQuad",
      update: ({ finished }) => finished.then(killCallback),
    });
  }, []);

  const onUpSwipeHandler = useCallback(({ deltaTime }) => {
    anime({
      targets: `#${cardId}`,
      translateY: -1 * window.screen.height,
      duration: deltaTime * 6,
      easing: "easeInOutQuad",
      update: ({ finished }) => finished.then(killCallback),
    });
  }, []);

  return (
    <Hammer
      onSwipeLeft={onXSwipeHandler}
      onSwipeRight={onXSwipeHandler}
      onSwipeUp={onUpSwipeHandler}
      direction="DIRECTION_ALL"
    >
      <div className="card" id={cardId} style={{ zIndex: zIndex }}>
        {title}
      </div>
    </Hammer>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  zIndex: PropTypes.number,
  killCallback: PropTypes.func,
};

export { Card };
