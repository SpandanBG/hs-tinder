import { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import Hammer from "react-hammerjs";
import {fireUserAction, USER_ACTIONS} from "../../api/content/content"

const SWIPE_UP_SPEED = 300;
const SWIPE_HORIZONTAL_SPEED = 250;


const Card = ({
  id,
  killCallback,
  leftSwipeBtnRef,
  rightSwipeBtnRef,
  isTop,
  children,
  addToFeedback
}) => {
  const movedRef = useRef(false);
  const timer = useRef(0)
  const [cardId] = useState(`card-${id}`);

  function startTimer() {
    timer.current = new Date();
  };
  
  function getElapsedTime() {
    const endTime = new Date();
    let timeDiff = endTime - timer.current;
    timeDiff /= 1000;
    const seconds = Math.round(timeDiff);
    return seconds
  }

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

    if(deltaX === 1){
      fireUserAction(USER_ACTIONS.LIKE, id)
      addToFeedback()
    }else{
      fireUserAction(USER_ACTIONS.DISLIKE, id)
      /** only swipe on dislike */
      anime({
        targets: `#${cardId}`,
        translateX: (deltaX < 0 ? -1 : 1) * window.screen.width,
        duration: SWIPE_HORIZONTAL_SPEED,
        easing: "easeInOutQuad",
        update: onSwipped,
      });
    }

  }, []);

  const onUpSwipeHandler = useCallback(() => {
    if (movedRef.current) return;

    const elapsedTime = getElapsedTime()
    console.log('elapsedTime', elapsedTime)
    if(elapsedTime > 3){
      fireUserAction(USER_ACTIONS.NORMALSKIP, id)
    }else{
      fireUserAction(USER_ACTIONS.QUICKSKIP, id)
    }

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
    if (!leftSwipeBtnRef.current || !rightSwipeBtnRef.current) return;

    leftSwipeBtnRef.current.onclick = () => onXSwipeHandler({ deltaX: -1 });
    const likedBtnOnlick = rightSwipeBtnRef.current.onclick
    rightSwipeBtnRef.current.onclick = () => {
      if(rightSwipeBtnRef.current.onclick){
        likedBtnOnlick()
      }
      onXSwipeHandler({ deltaX: 1 })
    };
  }, [isTop]);

  useEffect(()=>{
    startTimer()
  },[])

  return (
    <Hammer
      onSwipeLeft={onXSwipeHandler}
      onSwipeRight={()=>{}}
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
  leftSwipeBtnRef: PropTypes.object.isRequired,
  rightSwipeBtnRef: PropTypes.object.isRequired,
  isTop: PropTypes.bool,
};

export { Card };
