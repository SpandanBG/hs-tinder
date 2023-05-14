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
import { fireUserAction, USER_ACTIONS } from "../../api/content/content"

const isTop = (cardIndex, cardsLength) => {
  return cardIndex === cardsLength - 1;
};

const CardList = ({ cards, onCardSwipped }) => {
  const likeBtnRef = useRef(() => { });
  const dislikeBtnRef = useRef(() => { });
  const muteButtonRef = useRef(() => { });
  const isFirstLoad = useRef(true);
  const showDetails = useRef({})
  const tileTypeRef = useRef(ContentType.CLIP)
  const currentShowId = useRef('')

  const [isVideoMuted, setVideoMute] = useState(true)

  const isClip = tileTypeRef.current === ContentType.CLIP
  const primaryCtaProps = {
    className: isClip ? '' : 'btn-ads',
    text: isClip ? 'Watch Now' : 'Visit Site',
    icon: isClip ? 'fa fa-play icon-play' : ''
  }

  const addToWatchlistHandler = () => {
    fireUserAction(USER_ACTIONS.ADDTOWATCHLIST, currentShowId.current)
  }

  const watchNowHandler = () => {
    fireUserAction(USER_ACTIONS.WATCHNOW, currentShowId.current)
    const { showUrl: url } = showDetails.current
    window.open(url, '_blank').focus();
  }

  return (
    <>
      <BtnArrow />
      <ButtonMute muteButtonRef={muteButtonRef} isVideoMuted={isVideoMuted} />
      {isClip && <SemiCircleBtn type={BtnTypes.CROSS} btnRef={dislikeBtnRef} key={`${currentShowId.current}-dislike`} />}
      {cards.map((show, i) => {
        const { id, url: src, content_image_url: contentImg, contentType: type } = show
        tileTypeRef.current = type
        currentShowId.current = id
        showDetails.current = show
        return (
          <Card
            key={id}
            id={id}
            killCallback={() => onCardSwipped(id)}
            leftSwipeBtnRef={dislikeBtnRef}
            rightSwipeBtnRef={likeBtnRef}
            isTop={isTop(i, cards.length)}
          >
            {isTop(i, cards.length) ? <ShowTitle src={contentImg} /> : ''}
            <VideoCard autoplay={isTop(i, cards.length)} title={id} setVideoMute={setVideoMute} muteButtonRef={muteButtonRef} vidSrc={src} isFirstLoad={isFirstLoad} isVideoMuted={isVideoMuted} id={id} />
          </Card>
        )
      })}
      {isClip && <SemiCircleBtn type={BtnTypes.HEART} btnRef={likeBtnRef} key={`${currentShowId.current}-like`} />}
      <div className="button-tray">
        <ButtonWatchNow  {...primaryCtaProps} onClick={watchNowHandler} />
        {isClip && <ButtonWatchlist onClick={addToWatchlistHandler} />}
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
