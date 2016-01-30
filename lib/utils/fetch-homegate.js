import superagent from './superagent'
import {MongoClient} from 'mongodb'
import assert from 'assert'
import colors from 'colors'

import mongoConfig from '../mongo-config'

const AUTH_KEY = process.env.HOMEGATE_AUTH
const API_BASE = process.env.HOMEGATE_API_BASE
const REFRESH_RATE = process.env.HOMEGATE_REFRESH_RATE || 3480 // 58 minutes

export default function ensureData(cb) {
  refreshHomegateData(cb);

  setTimeout(refreshHomegateData, REFRESH_RATE * 1000);

  console.log(`We're going to refresh every ${REFRESH_RATE.toString().cyan} seconds.`)
}

function refreshHomegateData(cb) {
  MongoClient.connect(mongoConfig.url, function(err, db) {
    function done() {
      db.close();
      if(cb) {
        cb();
      }
    }

    assert.equal(null, err);

    var flats = db.collection('flats');
    var newFlats = db.collection('newFlats')

    var start = new Date();

    console.log(`Start caching homegate data... ${start}`.bgRed.white)

    query(1, [], (data) => {

      var fetch = new Date();

      console.log(`Homegate data fetching finished ${fetch} ${(fetch.getTime()-start.getTime())/1000}s `.bgGreen.black)

      newFlats.insertMany(data, null, function(err, result) {
        var insert = new Date();
        console.log(`Homegate data inserting into newFlats finished ${insert} ${(insert.getTime()-fetch.getTime())/1000}s `.bgGreen.black)

        flats.drop(function(err, result) {
          var drop = new Date();
          console.log(`Homegate data dropping finished ${drop} ${(drop.getTime()-insert.getTime())/1000}s `.bgGreen.black)

          if(err) {
            console.log(err);
          }


          newFlats.rename('flats', function(err, result) {
            var rename = new Date();
            console.log(`Homegate data renaming finished ${rename} ${(rename.getTime()-drop.getTime())/1000}s `.bgGreen.black)

            if(err) {
              console.log(err);
            }

            done();
          });
        });
      });

    });
  });
}

function query(page, flats, cb) {
  superagent
    .get(`${API_BASE}/rs/real-estates`)
    .set('auth', AUTH_KEY)
    .query({ language: 'en' })
    .query({ chooseType: 'rentflat' })
    .query({ sort: 'l' })
    .query({ page: !page ? 1 : page })
    .query({ numberResults: 1000 })
    .end(function(err, result){
      if (result.ok) {

        console.log(`${page}/${result.body.pageCount}`);

        flats = flats.concat(result.body.items);

        if(result.body.pageCount > page) {
          query(page+1, flats, cb);
        } else {
          cb(flats);
        }

      } else {
        res.send(err)
      }
    })
}
