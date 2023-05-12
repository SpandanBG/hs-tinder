import PropTypes from "prop-types";
import { Card } from "../../components/card";

const CardList = ({ cards, onCardSwipped }) =>
  cards.map(({ title }) => (
    <Card key={title} title={title} killCallback={() => onCardSwipped(title)} />
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
