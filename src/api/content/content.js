import axios from "axios";
import {config} from './config'

let Index = 5;

const ContentType = {
  AD: 'AD',
  CLIP: 'CLIP'
}

async function ping() {
  axios
    .get("https://reward-service-pp.pp.hotstar-labs.com/ping?user=Tester", {
      headers: {
        countryCode: 'IN',
      },
      data: {}
    })
    .then((response) => {
      console.log(response);
    });
}

async function getInitialContent() {
  return new Promise((resolve) =>
    resolve(config.slice(0,5).reverse())
  );
}


async function getNextContent() {
  return new Promise((resolve) => {
    const nextTiles = config.slice(Index,Index+1)
    if(Index < config.length)
    {
      Index = Index + 1
    }else{
      Index = 0
    }
    resolve(nextTiles[0]);
  });
}

export { ping, getInitialContent, getNextContent, ContentType };
