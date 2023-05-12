import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card } from "../../components/card";

const CardList = ({ cards }) => {
  const [cardData, setCardData] = useState(cards);

  const removeCard = useCallback((title) => {
    setCardData((oldCards) =>
      oldCards.filter(({ title: cardTitle }) => cardTitle !== title)
    );
  }, []);

  return cardData.slice(0).reverse().map(({ title }, index) => (
    <Card title={title} zIndex={index} killCallback={() => removeCard(title)} />
  ));
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.objectOf({
      title: PropTypes.string,
    })
  ),
};

export { CardList };
