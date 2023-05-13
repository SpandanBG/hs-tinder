import axios from "axios";


const TestVid = 'https://secure-media.hotstar.com/static/asmm/vid/test-vid.mp4'
const TestVid2 = 'https://secure-media.hotstar.com/static/asmm/vid/test-vid2.mp4'
const TestVid3 = 'https://secure-media.hotstar.com/static/asmm/vid/test-vid3.mp4'

const wanda = 'https://img1.hotstarext.com/image/upload/f_auto,h_136/sources/r1/cms/prod/2844/1382844-t-c40828be0daf';
const guardians = 'https://img1.hotstarext.com/image/upload/f_auto,h_136/sources/r1/cms/prod/2844/1382844-t-c40828be0daf';
const specials = 'https://img1.hotstarext.com/image/upload/f_auto,h_148/sources/r1/cms/prod/6197/1516197-t-d6940a1ba339'


const ContentType = {
  AD: 'AD',
  CLIP: 'CLIP'
}

async function ping() {
  axios
    .get("https://reward-service-pp.pp.hotstar-labs.com/ping?user=Tester", {
      headers: {
        countryCode: 'IN'
      }
    })
    .then((response) => {
      console.log(response);
    });
}

async function getInitialContent() {
  return new Promise((resolve) =>
    resolve([
      { title: "5-5", contentImg: specials, src:TestVid , type: ContentType.AD},
      { title: "4-4", contentImg: wanda, src:TestVid2,  type: ContentType.CLIP },
      { title: "3-3", contentImg: guardians, src:TestVid,  type: ContentType.CLIP},
      { title: "2-2", contentImg: wanda, src:TestVid,  type: ContentType.CLIP },
      { title: "1-1", contentImg: specials, src:TestVid2,  type: ContentType.CLIP },
    ])
  );
}

async function getNextContent() {
  return new Promise((resolve) => {
    const firstNumebr = parseInt((Math.random() * 100) % 100);
    const secondNumber = parseInt((Math.random() * 100) % 100);
    resolve({ title: `${firstNumebr}-${secondNumber}`, contentImg: specials, src:TestVid, type: ContentType.CLIP });
  });
}

export { ping, getInitialContent, getNextContent, ContentType };
