import PropTypes from "prop-types";
import { Card } from "../../components/card";
import { VideoCard } from "../../components/video"

const shouldAutoPlay = (i,l) => {
  return i === l-1
}

const CardList = ({ cards, onCardSwipped }) =>
  cards.map(({ title }, i) => (
    <Card key={title} id={title} killCallback={() => onCardSwipped(title)}>
      <div>{title}</div>
      <VideoCard autoplay={shouldAutoPlay(i, cards.length)} title={title}/>
    </Card>
  ));

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onCardSwipped: PropTypes.func.isRequired,
};

export { CardList };
