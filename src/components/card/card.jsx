import { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import Hammer from "react-hammerjs";

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

  const onXSwipeHandler = useCallback(({ deltaX, deltaTime }) => {
    anime({
      targets: `#${cardId}`,
      translateX: (deltaX < 0 ? -1 : 1) * window.screen.width,
      duration: deltaTime * 6,
      easing: "easeInOutQuad",
      update: killOnSwipped,
    });
  }, []);

  const onUpSwipeHandler = useCallback(({ deltaTime }) => {
    anime({
      targets: `#${cardId}`,
      translateY: -1 * window.screen.height,
      duration: deltaTime * 6,
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
