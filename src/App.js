import './App.css'
import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import PagesNav from './components/PagesNav'
import Table from './components/Table'
import Cell, { HeaderCell } from './components/Cell'
import { API_KEY } from './configs'
import DivisionPicker from './components/DivisionPicker'
import { useMemo } from 'react'

const App = () => {
    const [data, setData] = useState(() => ({ raw: { descending: [] } }))
    const [sort, setSort] = useState(() => ({ value: 'raw', direction: 'descending' }))
    const [query, setQuery] = useState(() => ({ page: 1, division: 'I', tier: 'CHALLENGER' }))
    const { page, division, tier } = query

    const headers = useMemo(() => ['Summoner', 'Points', 'Wins', 'Losses'], [])
    
    const createHeaders = (header, i) => <HeaderCell key={i} value={header} setSort={setSort} sort={sort} />

    const createRow = (summoner, i) => {
        const { summonerName, leaguePoints, wins, losses } = summoner
        return (
            <Fragment key={i}>
                <Cell row={i} value={summonerName} />
                <Cell row={i} value={leaguePoints} />
                <Cell row={i} value={wins} />
                <Cell row={i} value={losses} />
            </Fragment>
        )
    }

    const iSort = (arr, keyToCompare) => {
        const result = [...arr]

        for (let i = 0; i < result.length - 1; i++) {
            for (let j = i + 1; j < result.length; j++) {
                if (result[j][keyToCompare] > result[i][keyToCompare]) {
                    const temp = result[i]
                    result[i] = result[j]
                    result[j] = temp
                }
            }
        }
        return result
    }

    /* call api on page change and save sorted variations */
    useEffect(() => {
        let isCancel = false
        setData({ raw: { descending: [] } })

        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${tier}/${division}?page=${page}&api_key=${API_KEY}`
                )

                if (!isCancel) {
                    setData({ raw: { descending: response.data } })
                }
            } catch (error) {
                if (!isCancel) {
                    if (error.response) {
                        // Request made but the server responded with an error
                        console.log(error.response.data)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    } else if (error.request) {
                        // Request made but no response is received from the server.
                        console.log(error.request)
                    } else {
                        // Error occured while setting up the request
                        console.log('Error', error.message)
                    }
                }
            }
        }

        getData()

        return () => {
            isCancel = true
        }
    }, [query, page, tier, division])

    useEffect(() => {
        // move this logic into the fetch
        const { descending: rawData } = data.raw

        setData({
            raw: data.raw,
            points: { descending: iSort(rawData, 'leaguePoints'), ascending: iSort(rawData, 'leaguePoints').reverse() },
            wins: { descending: iSort(rawData, 'wins'), ascending: iSort(rawData, 'wins').reverse() },
            losses: { descending: iSort(rawData, 'losses'), ascending: iSort(rawData, 'losses').reverse() },
            summoner: { descending: iSort(rawData, 'summonerName'), ascending: iSort(rawData, 'summonerName').reverse() }
        })
        console.log('data', data)
    }, [data.raw])

    return (
        <div className='App'>
            <h1>LoL Stats</h1>
            <DivisionPicker currTier={tier} setQuery={setQuery} />
            {/* <PagesNav setQuery={setQuery} /> */}
            <Table>
                {headers.map(createHeaders)}
                {data[sort.value]?.[sort.direction]?.map(createRow)}
            </Table>
        </div>
    )
}

export default App
