import axios from 'axios'
import _unionBy from 'lodash/unionBy'
import { writable, get } from 'svelte/store'

export const movies = writable([])
export const loading = writable(false)
export const theMovie = writable({})
export const message = writable('Search for the movie title!')

export async function searchMovies(payload) {

    if(get(loading)) return 
    loading.set(true)

    let total = 0
    
    try {
        const res = await _fetchMovie({
            ...payload,
            page: 1
        })
        const {Search, totalResults} = res.data
        movies.set(Search)  
        total = totalResults
    } catch (msg) {
        movies.set([])
        message.set(msg)
        loading.set(false)
        return 
    }

    // 검색결과 14 / 10 => 1.4 => 2페이지
    // 검색결과 7 / 0.7 => 1 => 1페이지
    // 검색결과 63 / 6.3 => 1.4 => 7페이지
    const pageLength = Math.ceil(total / 10)

    if(pageLength > 1){
        for(let page = 2; page <= pageLength; page += 1){
            if(page > (number / 10)) break
            const res = await _fetchMovie({
                ...payload,
                page: page
            }) 
            const { Search } = res.data
            movies.update($movies => _unionBy($movies, Search, 'imdbID'))
        }
    }

    loading.set(false)
}

export async function searchMovieWithId(id){
    if(get(loading)) return
    loading.set(true)
    
    const res = await _fetchMovie({
        id: id,
    })
    console.log(res)

    theMovie.set(res.data)
    loading.set(false)
}

function _fetchMovie(payload){
    const { title, type, year, page, id } = payload
    const OMDB_API_KEY = '7035c60c'

    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}`

    return new Promise( async (resolve, reject) => {
        try{
            const res = await axios.get(url)
            console.log(res.data)
            if(res.data.Error){
                reject(res.error.message)
            }
            resolve(res)
        } catch (error) {
            console.log(error.response.status)
            reject(error.message)
        }
    })
}