import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCardsApi } from "../services/api";



export const fetchCountry = createAsyncThunk (
    'countriesSlice/fetchCards', async ({country, countryList}, thunkAPI) => {
        
        const allSubCards = []    
    
        await Promise.all(
            countryList[country].subreddits.map(async({name}) => {
                const cards = await getCardsApi(name);
                allSubCards.push({sub: name, cards})
            })
        )

        return {country, allSubCards}
    }
    )
    
    
    
    export const testThunk = (country, countryList) => {
        const allSubCards = []
        
        countryList[country].subreddits.map(async({name}) => {
            const cards = await getCardsApi(name);
            allSubCards.push({sub: name, cards})
        });
        
        return {country, allSubCards}
    }
    

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
                    const example = [{}, {}]
                    allSubCards.forEach(({sub, cards}) => {
                        if(name === sub) {
                                               
                            cards.forEach(card => 
                                {
                                    console.log(posts)    
                                    posts.forEach (post => {
                                        if(card.id !== post.id){
                                        posts.push(card)
                                    }
                                })}
                                )
                        };
                    })         
                })
        })
    }
    })

    export const selectCountries = (state) => {
       return state.countriesSlice
      
    }

    export const selectCountriesByValues = (state) => {
        return Object.values(state.countriesSlice);
    }

    export default countriesSlice.reducer;