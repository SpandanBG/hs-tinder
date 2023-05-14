import axios from "axios";
import { config } from './config'

let Index = 5;

const BASE_URL = 'https://reward-service-pp.pp.hotstar-labs.com'

const USER_ACTIONS = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE',
  LOOP: 'LOOP',
  NORMALSKIP: 'NORMALSKIP',
  QUICKSKIP: 'QUICKSKIP',
  ADDTOWATCHLIST: 'ADDTOWATCHLIST',
  CLIPWATCHED: 'CLIPWATCHED',
  WATCHNOW: 'WATCHNOW'
}

const ContentType = {
  AD: 'AD',
  CLIP: 'CLIP'
}

//adding clips in runtine can be fixed if time permits
let Clips

const getClips = () => {
  return Clips
}

const popClip = () => {
  const theRemovedElement = Clips.pop()
  console.log(theRemovedElement)
}

async function setUserGenre(generes = []) {
  axios
    .put(`${BASE_URL}/user/setgenre`,null, {
      headers: {
        countryCode: 'IN',
        'Content-Type': 'application/json'
      },
      data:{},
      params: {
        user: getUserId(),
        requiredGenre: generes.includes("ALL") || generes.length === 0 ? undefined : generes.join(',')
      },
    })
    .then((response) => {
      console.log(response);
    });
}


async function getContent() {
  return new Promise(res => {
    axios
      .post(`${BASE_URL}/user/getcontent`, null, {
        headers: {
          countryCode: 'IN',
          'Content-Type': 'application/json'
        },
        data: {},
        params: {
          user: getUserId()
        }
      })
      .then((response) => {
        res(response.data);
      }).catch(e => {
        console.error(e)
        res([])
      });
  })
}

async function getMatch() {
  return new Promise((res)=>{
    axios
      .get(`${BASE_URL}/user/getMatch`, {
        headers: {
          countryCode: 'IN',
        },
        data: {},
        params: {
          user: getUserId()
        }
      })
      .then((response) => {
        res(response.data)
      });
  })
}


async function fireUserAction(action, showId) {
  axios
    .post(`${BASE_URL}/user/action`, {
      headers: {
        countryCode: 'IN',
      },
      data: {
        user: getUserId(),
        action: {
          action,
          showId
        }
      }
    })
    .then((response) => {
      console.log(response);
    });
}


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const getUserId = () => {
  let userId = ''
  try {
    userId = sessionStorage.getItem("userId");
  } catch (e) {
    console.error(e)
  }
  return userId
}


async function getInitialContent() {
  const tiles = await getContent()
  Clips = tiles
  return tiles
}


async function getNextContent() {
  if(Clips.length === 0){
    return null
  }
  if(Clips.length < 3){
    const nextItems = await getContent()
    Clips = [...nextItems,...Clips]
  }
  return Clips;
}

export { getClips, getMatch, getInitialContent, getNextContent, ContentType, makeid, getContent, setUserGenre, fireUserAction, USER_ACTIONS, getUserId, popClip };
