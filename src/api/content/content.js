import axios from "axios";
import TestVid from '../../vid/test-vid.mp4'
import TestVid2 from '../../vid/test-vid2.mp4'
import TestVid3 from '../../vid/test-vid3.mp4'

const wanda = 'https://img1.hotstarext.com/image/upload/f_auto,h_136/sources/r1/cms/prod/2844/1382844-t-c40828be0daf';
const guardians = 'https://img1.hotstarext.com/image/upload/f_auto,h_136/sources/r1/cms/prod/2844/1382844-t-c40828be0daf';
const specials = 'https://img1.hotstarext.com/image/upload/f_auto,h_148/sources/r1/cms/prod/6197/1516197-t-d6940a1ba339'


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
      { title: "5-5" , contentImg: specials, src:TestVid},
      { title: "4-4", contentImg: wanda, src:TestVid2 },
      { title: "3-3", contentImg: guardians, src:TestVid3},
      { title: "2-2", contentImg: wanda, src:TestVid },
      { title: "1-1", contentImg: specials, src:TestVid2 },
    ])
  );
}

async function getNextContent() {
  return new Promise((resolve) => {
    const firstNumebr = parseInt((Math.random() * 100) % 100);
    const secondNumber = parseInt((Math.random() * 100) % 100);
    resolve({ title: `${firstNumebr}-${secondNumber}` });
  });
}

export { ping, getInitialContent, getNextContent };
