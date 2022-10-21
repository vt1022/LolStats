import './App.css'
import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import PagesNav from './components/PagesNav'
import Table from './components/Table'
import Cell, { HeaderCell } from './components/Cell'
import { API_KEY } from './configs'

const App = () => {
    const [data, setData] = useState({ points: [] }) // [[...page1],[...page2],...]
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('points')

    const headers = ['Summoner', 'Points', 'Wins', 'Losses']
    const createHeaders = (header, i) => <HeaderCell key={i} value={header} setSort={setSort} />

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

    /* call api on page change and save sorted variations */
    useEffect(() => {
        let isCancel = false

        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=${page}&api_key=${API_KEY}`
                )

                if (!isCancel) {
                    setData({ points: response.data })
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
    }, [page])

    useEffect(() => {
        const { points } = data

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

        setData({
            ...data,
            wins: iSort(points, 'wins'),
            losses: iSort(points, 'losses'),
            summoner: iSort(points, 'summonerName')
        })
        console.log('data', data)
    }, [data.points])

    return (
        <div className='App'>
            <h1>LoL Stats</h1>
            <PagesNav />
            <Table>
                {headers.map(createHeaders)}
                {data[sort]?.map(createRow)}
            </Table>
        </div>
    )
}

export default App
