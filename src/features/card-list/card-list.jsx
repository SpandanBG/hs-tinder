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
  const isFirstLoad = useRef(true);
  const tileTypeRef = useRef(ContentType.CLIP)

  const [isVideoMuted, setVideoMute] = useState(true)

  const isClip = tileTypeRef.current === ContentType.CLIP
  const primaryCtaProps = {
    className: isClip ? '' :'btn-ads',
    text: isClip? 'Watch Now': 'Visit Site',
    icon: isClip? 'fa fa-play icon-play': ''
  }

  return (
    <>
      <BtnArrow />
      <ButtonMute muteButtonRef={muteButtonRef} isVideoMuted={isVideoMuted} />
      {isClip && <SemiCircleBtn type={BtnTypes.CROSS} btnRef={dislikeBtnRef} />}
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
            <VideoCard autoplay={isTop(i, cards.length)} title={title} setVideoMute={setVideoMute} muteButtonRef={muteButtonRef} vidSrc={src} isFirstLoad={isFirstLoad} isVideoMuted={isVideoMuted}/>
          </Card>
        )
      })}
      {isClip && <SemiCircleBtn type={BtnTypes.HEART} btnRef={likeBtnRef} />}
       <div className="button-tray">
        <ButtonWatchNow  {...primaryCtaProps}/>
       {isClip && <ButtonWatchlist />}
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
