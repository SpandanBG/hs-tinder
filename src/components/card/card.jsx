import { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import Hammer from "react-hammerjs";

const SWIPE_UP_SPEED = 300;
const SWIPE_HORIZONTAL_SPEED = 250;

const Card = ({ title, killCallback }) => {
  const movedRef = useRef(false);
  const [cardId] = useState(`card-${title}`);

  const killOnSwipped = useCallback(
    ({ finished }) => {
      if (movedRef.current) return;
      finished.then(killCallback);
      movedRef.current = !movedRef.current;
    },
    [movedRef]
  );

  const onXSwipeHandler = useCallback(({ deltaX }) => {
    if (movedRef.current) return;
    anime({
      targets: `#${cardId}`,
      translateX: (deltaX < 0 ? -1 : 1) * window.screen.width,
      duration: SWIPE_HORIZONTAL_SPEED,
      easing: "easeInOutQuad",
      update: killOnSwipped,
    });
  }, []);

  const onUpSwipeHandler = useCallback(() => {
    if (movedRef.current) return;
    anime({
      targets: `#${cardId}`,
      translateY: -1 * window.screen.height,
      duration: SWIPE_UP_SPEED,
      easing: "easeInOutQuad",
      update: killOnSwipped,
    });
  }, []);

  return (
    <Hammer
      onSwipeLeft={onXSwipeHandler}
      onSwipeRight={onXSwipeHandler}
      onSwipeUp={onUpSwipeHandler}
      direction="DIRECTION_ALL"
    >
      <div className="card" id={cardId}>
        {title}
      </div>
    </Hammer>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  killCallback: PropTypes.func.isRequired,
};

export { Card };
