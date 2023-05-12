import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Card } from "../../components/card";
import { SemiCircleBtn, BtnTypes } from "../../components/semi-circle-btn";
import { VideoCard } from "../../components/video";
import { ButtonMute } from '../../components/ButtonMute'
import { ButtonWatchNow } from "../../components/ButtonWatchNow"
import { ButtonWatchlist } from "../../components/ButtonWatchlist"

const isTop = (cardIndex, cardsLength) => {
  return cardIndex === cardsLength - 1;
};

const CardList = ({ cards, onCardSwipped }) => {
  const likeBtnRef = useRef(() => { });
  const dislikeBtnRef = useRef(() => { });
  const muteButtonRef = useRef(() => { });

  const [isVideoMuted, setVideoMute] = useState(true)

  return (
    <>
      <ButtonMute muteButtonRef={muteButtonRef} isVideoMuted={isVideoMuted} />
      <SemiCircleBtn type={BtnTypes.CROSS} btnRef={dislikeBtnRef} />
      {cards.map(({ title }, i) => (
        <Card
          key={title}
          id={title}
          killCallback={() => onCardSwipped(title)}
          leftSwipeBtnRef={dislikeBtnRef}
          rightSwipeBtnRef={likeBtnRef}
          isTop={isTop(i, cards.length)}
        >
          <VideoCard autoplay={isTop(i, cards.length)} title={title} setVideoMute={setVideoMute} muteButtonRef={muteButtonRef} />
        </Card>
      ))}
      <SemiCircleBtn type={BtnTypes.CROSS} btnRef={dislikeBtnRef} />
      <SemiCircleBtn type={BtnTypes.HEART} btnRef={likeBtnRef} />
      <div className="botton-tray">
      <ButtonWatchNow />
      <ButtonWatchlist />
      </div>
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
