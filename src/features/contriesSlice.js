import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCardsApi } from "../services/api";


/* this is the async thunk for get the posts/cards of every subrredit that belongs to that specific country*/
/* this is dispatched when someone click in the country button for get the top posts */
export const fetchCountry = createAsyncThunk (
    'countriesSlice/fetchCards', async ({country, countryList}, thunkAPI) => { 
        
        const promises = countryList[country].subreddits.map(async({name, posts}) => {

            const cardsRetrieve = await getCardsApi(name);
              /*some calls get rejected. So there is validation if they're arrays or not*/

            if(Array.isArray(cardsRetrieve)) {
                return {sub: name, cards: [...cardsRetrieve]}
            }
            return []
            
        })        

        const allSubCards =  await Promise.all(promises)


        console.log(allSubCards)
        /* allSubCards is like [{sub: medellín, cards: [{medellíncard1}, {medellíncard2}]}, {sub: 'colombia, cards [...]}] */

        return {country, allSubCards}
    }
    )
    
    const countriesSlice = createSlice( {
        name: 'countriesSlice',
        initialState: {
            countriesData: {
                colombia: {
                    name: 'Colombia', 
                    img: 'https://i.ibb.co/PYm1N9X/colombia.png', 
                    subreddits: [
                        {name: 'colombia', posts: [] }, 
                        {name: 'medellin', posts: []},
                        {name: 'Bogota', posts: []}
                    ]
                    },  
                argentina: {
                    name: 'Argentina', 
                    img:'https://i.ibb.co/0Kxv5cd/argentina.png',
                    subreddits: [
                        {name: 'argentina', posts: [] },
                        {name: 'Rosario', posts: [] }, 
                        {name: 'ArgentinaBenderStyle', posts: []},
                        {name: 'Cordoba', posts: []},
                        {name: 'BuenosAires', posts: []},
                        {name: 'RepublicaArgentina', posts: []},
                        {name: 'AskArgentina', posts: []},
                        {name: 'dankgentina', posts: []},
                        {name: 'AskArgentina', posts: []},
                    ]
                },
                mexico: {
                    name: 
                    'Mexico', /*without tilde to avoid problems with the routing */
                    img: 'https://i.ibb.co/fdb5R0v/mexico.png',
                    subreddits: [
                        {name: 'Monterrey', posts: []},
                        {name: 'Puebla', posts: []},
                        {name: 'mexico', posts: []},
                        {name: 'MexicoCity', posts: []},
                        {name: 'SomosMexico', posts: []},
                        {name: 'Mexico_News', posts: []},
                        {name: 'MexicoFinanciero', posts: []},
                        {name: 'MemesMexico', posts: []},
                        {name: 'Guadalajara', posts: []},
                        {name: 'tijuana', posts: []}
                ]
                },
                chile: {
                    name: 'Chile', 
                    img: 'https://i.ibb.co/MZwVvGd/chile.png', 
                    subreddits : [
                        {name: 'yo_ctm', posts: []},
                        {name: 'chile', posts: []},
                        {name: 'RepublicadeChile', posts: []},
                        {name: 'Santiago', posts: []},
                        {name: 'ChileCringe', posts: []},
                    ]}, 
                uruguay: {
                name: 'Uruguay', 
                img: 'https://i.ibb.co/RvcttWk/uruguay.png',
                subreddits: [
                    {name : 'CharruaDevs', posts : []},
                    {name : 'UruguayCirclejerk', posts : []}
                ]}
            },
            isPending: true,
            // 
        },
        
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchCountry.fulfilled, (state, action) => {
                const {countriesData} = state
                const {country, allSubCards} = action.payload;
                state.isPending = false;
                /*Select all subreddit of that country*/ 
                countriesData[country].subreddits.forEach(({name, posts}) => {
                    allSubCards.forEach(({sub, cards}) => {
                        /*add cards in that subreddit and it'll add those that are not dupliated  */
                        if(name === sub) {      
                            cards?.forEach((card) => {
                                /*filter the cards that are no equal if there are actualcards
                                and those that doesn't include
                                a url array in the text property (this causes overflow)*/ 
                                if(!posts.some((post => post.id === card.id)) && 
                                  !card.text.includes('https')) {
                                    posts.push(card)
                                }
                            })                                                    
                            };                          
                        })         
                    })
        })
        builder.addCase(fetchCountry.pending, (state, action) => {
            state.isPending = true;
        });
    }
    })

    export const selectCountries = (state) => {
       return state.countriesSlice.countriesData
    }

    export const selectIsLoading = (state) => {
        return state.countriesSlice.isPending;
     }


    export default countriesSlice.reducer;