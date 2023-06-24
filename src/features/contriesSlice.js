import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCardsApi } from "../services/api";


/* this is the async thunk for get the posts/cards of every subrredit that belongs to that specific country*/
/* this is dispatched when someone click in the country button for get the top posts */
export const fetchCountry = createAsyncThunk (
    'countriesSlice/fetchCards', async ({country, countryList}, thunkAPI) => { 
        
        const allSubCards = []  

        await Promise.all(
            countryList[country].subreddits.map(async({name}) => {
                const cards = await getCardsApi(name);
                allSubCards.push({sub: name, cards})
            })
            )                           
        /* allSubCards is like [{sub: medellín, cards: [{medellíncard1}, {medellíncard2}]}, {sub: 'colombia, cards [...]}] */

        return {country, allSubCards}
    }
    )
    

    const countriesSlice = createSlice( {
        name: 'countriesSlice',
        initialState: {
            colombia: {name: 'Colombia', 
            img: 'https://i.ibb.co/PYm1N9X/colombia.png', 
            subreddits: [{name: 'colombia', posts: [] }, {name: 'medellin', posts: []}] },
            
            argentina: {name: 'Argentina', img:'https://i.ibb.co/0Kxv5cd/argentina.png'},
            mexico: {name: 'México', img: 'https://i.ibb.co/fdb5R0v/mexico.png'},
            chile: {name: 'Chile', img: 'https://i.ibb.co/MZwVvGd/chile.png'},
            uruguay: {name: 'Uruguay', img: 'https://i.ibb.co/RvcttWk/uruguay.png'},
        },
        
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchCountry.fulfilled, (state, action) => {

                const {country, allSubCards} = action.payload;
                state[country].subreddits.forEach(({name, posts}) => {
                    allSubCards.forEach(({sub, cards}) => {

                        if(name === sub) {      
                            cards.forEach((card) => {
                                if(!posts.some((post => post.id === card.id))) {
                                    posts.push(card)
                                }
                            })                                                    
                            };                          
                        })         
                    })
        })
    }
    })

    export const selectCountries = (state) => {
       return state.countriesSlice
    }


    export default countriesSlice.reducer;