import { createSlice } from "@reduxjs/toolkit";
import { getCardsApi } from "../services/api";


const fetchCountry = createAsyncThunk (
    'countriesSlice/fetchCards', async (country, thunkAPI) => {
        const cards = await getCardsApi(country);
        return cards;
    }
)

const countriesSlice = createSlice( {
    name: 'countriesSlice',
    initialState: {
        colombia:  {name: 'Colombia', 
        img: 'https://i.ibb.co/PYm1N9X/colombia.png', 
        subreddits: [{name: 'r/colombia', posts: [] }, {}],

        argentina:  {name: 'Argentina', img: 'https://i.ibb.co/0Kxv5cd/argentina.png'},
        mexico: {name: 'México', img: 'https://i.ibb.co/fdb5R0v/mexico.png'},
        chile: {name: 'Chile', img: 'https://i.ibb.co/MZwVvGd/chile.png'},
        uruguay: {name: 'Uruguay', img: 'https://i.ibb.co/RvcttWk/uruguay.png'}
    }},

    reducers: {
        getCards: async (state, action) => {
            
            const country = state.action.payload;
            
            country.subrreddits.map(async subreddit => {
                const Cards = await getCardsApi(subreddit.name)
                subreddit.post.push(Cards)
            }) 
        }
    }
    })

    export const selectCountriesNames = (state) => {
       return Object.keys(state.countriesSlice)
        
    }