import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Card } from "../../components/card";
import { SemiCircleBtn, BtnTypes } from "../../components/semi-circle-btn";
import { VideoCard } from "../../components/video";
import { ButtonMute } from '../../components/ButtonMute'
import { ButtonWatchNow } from "../../components/ButtonWatchNow"
import { ButtonWatchlist } from "../../components/ButtonWatchlist"
import { BtnArrow } from '../../components/BtnArrow'
import { ShowTitle } from '../../components/ShowTitle'
import { ContentType } from '../../api/content'

const isTop = (cardIndex, cardsLength) => {
  return cardIndex === cardsLength - 1;
};

const CardList = ({ cards, onCardSwipped }) => {
  const likeBtnRef = useRef(() => { });
  const dislikeBtnRef = useRef(() => { });
  const muteButtonRef = useRef(() => { });
  const tileTypeRef = useRef(ContentType.CLIP)

  const [isVideoMuted, setVideoMute] = useState(true)

  return (
    <>
      <BtnArrow />
      <ButtonMute muteButtonRef={muteButtonRef} isVideoMuted={isVideoMuted} />
      {tileTypeRef.current === ContentType.CLIP && <SemiCircleBtn type={BtnTypes.CROSS} btnRef={dislikeBtnRef} />}
      {cards.map(({ title, src, contentImg, type }, i) => {
        tileTypeRef.current = type
        return (
          <Card
            key={title}
            id={title}
            killCallback={() => onCardSwipped(title)}
            leftSwipeBtnRef={dislikeBtnRef}
            rightSwipeBtnRef={likeBtnRef}
            isTop={isTop(i, cards.length)}
          >
            {isTop(i, cards.length) ? <ShowTitle src={contentImg} /> : ''}
            <VideoCard autoplay={isTop(i, cards.length)} title={title} setVideoMute={setVideoMute} muteButtonRef={muteButtonRef} vidSrc={src} />
          </Card>
        )
      })}
      {tileTypeRef.current === ContentType.CLIP && <SemiCircleBtn type={BtnTypes.HEART} btnRef={likeBtnRef} />}
      {tileTypeRef.current === ContentType.CLIP && <div className="botton-tray">
        <ButtonWatchNow />
        <ButtonWatchlist />
      </div>}
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
