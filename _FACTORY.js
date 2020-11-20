import { hashtags } from '../data.js';
import { settings } from '../../settings.js';
import rawTweets from './_REVERSE.js';

export const tweetifier = (string, data) => {
  var allGood = true;
  var tweetAnalytics = {};
  let arr = string.split("\n");
  arr = arr.filter((tweet) => Boolean(tweet)); //remove undefined's

  arr = arr.map((tweet) => {
    var tweetArr = tweet.split(" ");
    // if (Boolean(typeof parseInt(tweetArr[0]))) tweet = tweetArr.slice(1).join(" ");
    return tweet;
  });

  arr = arr.map((tweet, idx) => {
    tweetAnalytics[idx] = {};
    tweetAnalytics[idx].integratedHashes = [];
    tweet.split(" ").forEach((word) => {
      if (word[0] === "#") tweetAnalytics[idx].integratedHashes.push(word);
    });
    if (factorySettings.filterHash && integratedHashes.length > 0) {
      tweet
        .split(" ")
        .filter((word) => word[0] !== "#")
        .join(" ");
    }
    return tweet;
  });

  console.log(arr);

  arr.forEach((tweet, idx) => {
    var charCount = 278 - tweet.length - data.hashtags.length;
    console.log(`#${idx} '${tweet.slice(0, 10)}...'`, charCount);
    if (charCount < 0) allGood = false;
  });
  if (!allGood) return;

  arr = arr.map((tweet, idx) => {
    let object = {};
    object.tweetContent = "";
    object.tweetData = {};
    object.link = "";
    object.media = "";
    if (tweet === "") return;
    tweet = tweet
      .split(" ")
      .filter((word) => {
        if (word.slice(0, 6) === "https:") {
          object.link = "\n" + word;
          return;
        }
        return word;
      })
      .join(" ");

    object.tweetContent = tweet;
    object.tweetData.genre = data.genre;
    object.tweetData.idx = idx;
    if (factorySettings.addHash) {
      if (tweetAnalytics[idx].integratedHashes.length == 0) {
        object.tweetData.hashtags = ` ${data.hashtags[0]} ${data.hashtags[1]} `;
      } else if (tweetAnalytics[idx].integratedHashes.length == 1) {
        object.tweetData.hashtags = " " + data.hashtags[data.hashtags[0] !== tweetAnalytics[idx].integratedHashes[0] ? 0 : 1] + " ";
      } else {
        object.tweetData.hashtags = "";
      }
    }
    // var hashToInclude = data.hashtags.filter(hash => {
    //   tweetAnalytics[idx].integratedHashes.some(integratedHash => hash !== integratedHash)
    // })
    // object.tweetData.hashtags = ` ${hashToInclude} `
    return object;
  });

  console.log(arr);
  // console.log(tweetAnalytics);
};

var newTweets = `How long can Turkey hide the fact that it is spending far beyond its means? Turkey has spent more than it should and done it by hiding the costs deep in its financial system, only visible to committed financial sleuths. Erdogan’s economic coverup is about to be exposed.

Erdogan, shocked at how little hard cash was left in Turkey’s central bank, fired his hand picked central bank governor Uysal. Turkey’s central bank was spending money trying to protect its failing lira.

Turkey’s ministry of treasury, Albayrak, resigned via Instagram and deleted his Twitter account. Albayrak is Erdogan’s son-in-law.

The EU imposed sanctions on Turkey for its illegal drilling in the Mediterranean Sea. France has demanded a bolder policy against Turkey. All this is bad news for Turkey because the worsen tensions between Europe and Turkey. 

Turkish lira is one of the most volatile and vulnerable currencies in the world. Covid-19 has pushed the lira to a record low, down by roughly 50% against the US $ and 56 percent against the €. 

Erdogan has  jailed political opponents, which has lead to stifling pluralism and limiting freedom of political debate, a core component of a democratic society. 

Turkey has removed over 30 Turkish judges and prosecutors leading to self-censorship in the judiciary, further undermining Turkey’s independence and impartiality. 

President Aliyev was elected to a fourth term in 2018 amid electoral fraud. Azerbaijan’s corrupt and inefficient judiciary is subject to political pressure, and outcomes frequently appear to be predetermined. 

On 9/27, Azerbaijan gov’t restrict access to the internet and reduced access to services such as Facebook, WhatsApp, Telegram, Twitter, and Skype. Azerbaijan has a long history of suppressing the free flow of information and silencing critical voices. 

Azerbaijani people are not allowed to protest. The Azeri police arrested dozens of protesters rallying against the imprisonment of a high-profile opposition leader.`;

const factorySettings = {
  filterHash: false,
  addHash: true,
}

var tweetData = {
  genre: "Turkish/Azeri Economy",
  // hashtags: ` ${hashtags.stopAli} ${hashtags.azeriWar} `,
  hashtags: [hashtags.sancTurk, hashtags.stopErd],
  idx: 0,
};

// console.log(rawTweets())

tweetifier(newTweets, tweetData);