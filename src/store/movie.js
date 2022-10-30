import axios from 'axios'
import {writable, get} from 'svelte/store'

export const movies = writable([])
export async function searchMovies(payload) {
    const {title, type, year, number} = payload
    const ONDB_API_KEY = '7035c60c'

const res = await axios.get(`https://www.omdbapi.com/?apikey=${ONDB_API_KEY}&s=${title}&type=${type}&y=${year}`)
    console.log(res)

    const {Search, totalResults} = res.data
    movies.set(Search)

    // 검색결과 14 / 10 => 1.4 => 2페이지
    // 검색결과 7 / 0.7 => 1 => 1페이지
    // 검색결과 63 / 6.3 => 1.4 => 7페이지
    const pageLength = Math.ceil(totalResults / 10)

    if(pageLength > 1){
        for(let page = 2; page <= pageLength; page += 1){
            if(page > (number / 10)) break
            const res = await axios.get(`https://www.omdbapi.com/?apikey=${ONDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)       
            const {Search} = res.data
            movies.update($movies => {
                $movies.push(...Search)
                return $movies
            })
        }
    }

    console.log(get(movies))
}