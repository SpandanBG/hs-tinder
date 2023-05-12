import { useRef } from "react";
import PropTypes from "prop-types";
import { Card } from "../../components/card";
import { SemiCircleBtn, BtnTypes } from "../../components/semi-circle-btn";
import { VideoCard } from "../../components/video";

const isTop = (cardIndex, cardsLength) => {
  return cardIndex === cardsLength - 1;
};

const CardList = ({ cards, onCardSwipped }) => {
  const likeBtnRef = useRef(null);
  const dislikeBtnRef = useRef(null);

  return (
    <>
      {cards.map(({ title }, i) => (
        <Card
          key={title}
          id={title}
          killCallback={() => onCardSwipped(title)}
          leftSwipeBtnRef={dislikeBtnRef}
          rightSwipeBtnRef={likeBtnRef}
          isTop={isTop(i, cards.length)}
        >
          <div>{title}</div>
          <VideoCard autoplay={isTop(i, cards.length)} title={title} />
        </Card>
      ))}
      <SemiCircleBtn type={BtnTypes.CROSS} btnRef={dislikeBtnRef} />
      <SemiCircleBtn type={BtnTypes.HEART} btnRef={likeBtnRef} />
    </>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onCardSwipped: PropTypes.func.isRequired,
};

export { CardList };
