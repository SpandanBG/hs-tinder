import { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import Hammer from "react-hammerjs";

const SWIPE_UP_SPEED = 300;
const SWIPE_HORIZONTAL_SPEED = 250;

const Card = ({
  id,
  killCallback,
  leftSwipeCallbackHook,
  rightSwipeCallbackHook,
  isTop,
  children,
}) => {
  const movedRef = useRef(false);
  const [cardId] = useState(`card-${id}`);

  const onSwipped = useCallback(
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
      update: onSwipped,
    });
  }, []);

  const onUpSwipeHandler = useCallback(() => {
    if (movedRef.current) return;
    anime({
      targets: `#${cardId}`,
      translateY: -1 * window.screen.height,
      duration: SWIPE_UP_SPEED,
      easing: "easeInOutQuad",
      update: onSwipped,
    });
  }, []);

  useEffect(() => {
    if (!isTop) return;

    if (!leftSwipeCallbackHook.current || !rightSwipeCallbackHook.current)
      return;

    leftSwipeCallbackHook.current.onclick = () =>
      onXSwipeHandler({ deltaX: -1 });

    rightSwipeCallbackHook.current.onclick = () =>
      onXSwipeHandler({ deltaX: 1 });
  }, [isTop]);

  return (
    <Hammer
      onSwipeLeft={onXSwipeHandler}
      onSwipeRight={onXSwipeHandler}
      onSwipeUp={onUpSwipeHandler}
      direction="DIRECTION_ALL"
    >
      <div className="card" id={cardId}>
        {children}
      </div>
    </Hammer>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  killCallback: PropTypes.func.isRequired,
  leftSwipeCallbackHook: PropTypes.object.isRequired,
  rightSwipeCallbackHook: PropTypes.object.isRequired,
  isTop: PropTypes.bool,
};

export { Card };
