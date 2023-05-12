import { useCallback } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import Hammer from "react-hammerjs";

const Card = ({ title }) => {
  const onSwipeHandler = useCallback((event) => {
    anime({
      targets: "#card",
      translateX:
        event.deltaX < 0 ? -1 * window.screen.width : window.screen.width,
      duration: event.deltaTime * 6,
      easing: "easeInOutQuad",
    });

    console.log(event);
  }, []);

  return (
    <Hammer onSwipe={onSwipeHandler}>
      <div className="card" id="card">
        {title}
      </div>
    </Hammer>
  );
};

Card.propTypes = {
  title: PropTypes.string,
};

export { Card };
