#!/usr/bin/env /usr/local/bin/node

const https = require('https');


(async () => {
  console.log('今日赛程');
  console.log('---');
  const req = await https.get('https://api.fri.tv/api/v2/match/matchListByDate/?encoding=utf-8', res => {
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', _ => {
      const { returnvalue: returnValue, msg, list } = JSON.parse(rawData);
      if (!returnValue || msg !== '成功') {
        console.log('请求失败')
      }

      outputData(list);
    })
  });
})();

function outputData(data) {
  data.forEach(item => {
    const { datalist } = item;
    datalist.forEach(match => {
      const {
        matchdateshort: matchdate,
        player1,
        player2,
        player1fen,
        player2fen,
        matchname
      } = match;
      console.log(
        `${matchname} ${matchdate} ` +
        `${player1} ${player1fen} : ` +
        `${player2fen} ${player2} ` +
        '| color=black'
      )
    })
  })
}
