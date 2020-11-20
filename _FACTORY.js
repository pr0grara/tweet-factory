const tweetifier = (string, data) => {
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
    // console.log(tweetAnalytics[idx].integratedHashes.length) //DEBUG
    if (
      factorySettings.filterHash &&
      tweetAnalytics[idx].integratedHashes.length > 0
    ) {
      tweet = tweet
        .split(" ")
        .filter((word) => word[0] !== "#")
        .join(" ");
    }
    // console.log(tweet) //DEBUG
    return tweet;
  });

  // console.log(arr); //DEBUG

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
        if (word.slice(0, 4) === "http") {
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
        object.tweetData.hashtags =
          " " +
          data.hashtags[
            data.hashtags[0] !== tweetAnalytics[idx].integratedHashes[0] ? 0 : 1
          ] +
          " ";
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

var newTweets = `Azerbaijan, a country with a "tentative" list of @UNESCO World Heritage listed sites is currently destroying & vandalising 60 pieces of Armenian historical & cultural heritage, 45 of which are older than Azerbaijan itself #PreserveArtsakh #RecognizeArtsakh

Cultural erasure is Azeri govt’s goals. When orgs like @UNESCO make partnerships with Azerbaijan, they help a regime erase Armenia from world history #RecognizeArtsakh #PreserveArtsakh https://hyperallergic.com/601492/google-arts-culture-as-an-agent-of-ethnic-cleansing/ 

Our heritage is your history & right now it is in the line of fire. @UNESCO @ICOMOS @GlobalHeritage @SavingPlaceshttps://www.theartnewspaper.com/news/monuments-in-line-of-fire-in-nagorno-karabakh-conflict?fbclid=IwAR0rosofC-QVA3i398cNoFedWZJAh5Wfh1gqD7KDHfPb4GpWpR_z3sGgkOw

In February 2017, President Aliyev appointed his wife Mehriban Aliyeva as the first vice president of Azerbaijan. #StopAliyev

Recent changes in the Azerbaijani Bar Association and amendments to the law on representation added to the plight of the rule of law in the country. #StopAliyev

Mehriban Aliyeva's appointment as @UNESCO Goodwill Ambassador contradicts her husband's campaign of cultural genocide in Artsakh. #StopAliyev #RecognizeArtsakh https://www.theguardian.com/artanddesign/2019/mar/01/monumental-loss-azerbaijan-cultural-genocide-khachkars

@UNESCO should not reward a dictatorship that uses nepotism to make up its govt, revoke the title of UNESCO Goodwill Ambassador from Mehriban Aliyeva #StopAliyev #RecognizeArtsakh

Wife of dictator, Mehriban Aliyeva, a @UNESCO Goodwill Ambassador... meanwhile her husband orders Azerbaijani forces to target civilians in Artsakh? #StopAliyev #RecognizeArtsakh theguardian.com/artanddesign/2019/mar/01/monumental-loss-azerbaijan-cultural-genocide-khachkars

Mehriban Aliyeva was appointed as @UNESCO Goodwill Ambassador based on her promotion of international cultural exchanges. If only her concern for culture extended to the preservation of Armenian culture, now slowly being eradicated in Artsakh #StopAliyev #RecognizeArtsakh

@UNESCO must act urgently in accordance with its mission to promote the cultural heritage & equal dignity of all cultures & step in to ensure the preservation of historic Armenian sites in Artsakh, now at risk of destruction by Azerbaijan #StopAliyev

@UNESCO Azerbaijan is attempting to erase the ancient Armenian heritage of Artsakh, claiming monasteries as their own #StopAliyev #RecognizeArtsakh

Azerbaijan’s pattern of cultural genocide has been documented #StopAliyev #RecognizeArtsakh https://www.theguardian.com/artanddesign/2019/mar/01/monumental-loss-azerbaijan-cultural-genocide-khachkars

Azerbaijan has consistently proven themselves intolerant to other cultures #RecognizeArtsakh #PreserveArtsakh https://www.theartnewspaper.com/news/monuments-in-line-of-fire-in-nagorno-karabakh-conflict?fbclid=IwAR0rosofC-QVA3i398cNoFedWZJAh5Wfh1gqD7KDHfPb4GpWpR_z3sGgkOw
`;

const factorySettings = {
  filterHash: false,
  addHash: true,
}

const hashtags = {
  artStrong: "#ArtsakhStrong",
  artIsArm: "#ArtsakhIsArmenia",
  stopAli: "#StopAliyev",
  stopErd: "#StopErdogan",
  stopAzeri: "#StopAzerbaijaniAggression",
  sancAzer: "#SanctionAzerbaijan",
  sancTurk: "#SanctionTurkey",
  recArt: "#RecognizeArtsakh",
  peace: "#PeaceForArmenians",
  believe: "#BelieveArmenia",
  azeriLies: "#AzerbaijanLies",
  azeriWar: "#AzeriWarCrimes",
  warCrimes: "#WarCrimes",
  drop: "#DropTurkey",
  stop: "#StopTurkey",
  space: "#SpaceX",
  stopsat: "#StopTurksat5A",
  telltruth: "#TellTheTruth",
  nyt: "#NewYorkTimes",
  fake: "#FakeNews",
  preserve: "#PreserveArtsakh",
};

var tweetData = {
  genre: "preserve artsakh",
  hashtags: [hashtags.sancTurk, hashtags.recArt],
  idx: 0,
};

tweetifier(newTweets, tweetData);