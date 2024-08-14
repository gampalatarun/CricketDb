const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbpath = path.join(__dirname, 'cricketMatchDetails.db')
app.use(express.json())

let db = null

const instailasizeDatabaseand = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`Db error:${e.message}`)
    process.exit(1)
  }
}

instailasizeDatabaseand()

// converstion of player details

const ConvertsnaketoCamelCaseofPlayerDetails = db => {
  return {
    playerId: db.player_id,
    playerName: db.player_name,
  }
}

//converstion of Match Details

const ConvertsnaketoCamelCaseofMatchDetails = db => {
  return {
    matchId: db.match_id,
    match: db.match,
    year: db.year,
  }
}

//converstion Match Score Details
const ConvertsnaketoCamelCaseofMatchScoreDetails = db => {
  return {
    playerMatchId: db.player_match_id,
    playerId: db.player_id,
    matchId: db.match_id,
    scores: db.scores,
    fours: db.fours,
    sixes: db.sixes,
  }
}

//API1

app.get('/players/', async (request, response) => {
  const getPlayerDetails = `SELECT * FROM player_details;`
  const playersDetails = await db.all(getPlayerDetails)
  response.send(
    playersDetails.map(eachplayer =>
      ConvertsnaketoCamelCaseofPlayerDetails(eachplayer),
    ),
  )
})

//API2

app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const getPlayerQuery = ` SELECT * FROM player_details WHERE player_id=${playerId};`
  const getPlayerId = await db.get(getPlayerQuery)
  response.send(ConvertsnaketoCamelCaseofPlayerDetails(getPlayerId))
})

//API3
app.put('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const {playerName} = request.body
  const updateQuery = `UPDATE player_details SET
  player_name='${playerName}' WHERE player_id=${playerId};`

  await db.run(updateQuery)

  response.send('Player Details Updated')
})

//API 4

app.get('/matches/:matchId/', async (request, response) => {
  const {matchId} = request.params
  const MatchQuery = `SELECT * FROM match_details WHERE match_id=${matchId};`
  const AllmatchDetails = await db.get(MatchQuery)

  response.send(ConvertsnaketoCamelCaseofMatchDetails(AllmatchDetails))
})

//API 5
app.get('/players/:playerId/matches', async (request, response) => {
  const {playerId} = request.params
  const matchesQUery = `SELECT * FROM match_details NATURAL JOIN player_match_score WHERE player_id=${playerId};`
  const uniqueplayerDetails = await db.all(matchesQUery)
  response.send(
    uniqueplayerDetails.map(eachplayer =>
      ConvertsnaketoCamelCaseofMatchDetails(eachplayer),
    ),
  )
})

module.exports = app
