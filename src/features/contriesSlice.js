import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCardsApi } from "../services/api";

/* This is the async thunk for getting the posts/cards of every subreddit that belongs to that specific country */
/* This is dispatched when someone clicks over the country button to get the top posts */
export const fetchCountry = createAsyncThunk(
    'countriesSlice/fetchCards',
    async ({ country, countryList }, thunkAPI) => {
        const promises = countryList[country].subreddits.map(async ({ name }) => {
            try {
                const cardsRetrieve = await getCardsApi(name);
                /* Some calls get rejected. So there is validation if they're arrays or not */
                return Array.isArray(cardsRetrieve) ? { sub: name, cards: cardsRetrieve } : [];
            } catch (error) {
                console.error(`Error fetching cards for ${name}:`, error);
                return [];
            }
        });

        const allSubCards = await Promise.all(promises);

        console.log(allSubCards);
        /* allSubCards is like [{sub: 'medellin', cards: [{medellincard1}, {medellincard2}]}, {sub: 'colombia', cards: [...]}] */

        return { country, allSubCards };
    }
);

const initialState = {
    countriesData: {
        colombia: {
            name: 'Colombia',
            img: 'https://i.ibb.co/PYm1N9X/colombia.png',
            subreddits: [
                { name: 'colombia', posts: [] },
                { name: 'medellin', posts: [] },
                { name: 'Bogota', posts: [] }
            ]
        },
        argentina: {
            name: 'Argentina',
            img: 'https://i.ibb.co/0Kxv5cd/argentina.png',
            subreddits: [
                { name: 'argentina', posts: [] },
                { name: 'Rosario', posts: [] },
                { name: 'ArgentinaBenderStyle', posts: [] },
                { name: 'Cordoba', posts: [] },
                { name: 'BuenosAires', posts: [] },
                { name: 'RepublicaArgentina', posts: [] },
                { name: 'AskArgentina', posts: [] },
                { name: 'dankgentina', posts: [] }
            ]
        },
        mexico: {
            name: 'Mexico', /* without tilde to avoid problems with the routing */
            img: 'https://i.ibb.co/fdb5R0v/mexico.png',
            subreddits: [
                { name: 'Monterrey', posts: [] },
                { name: 'Puebla', posts: [] },
                { name: 'mexico', posts: [] },
                { name: 'MexicoCity', posts: [] },
                { name: 'SomosMexico', posts: [] },
                { name: 'Mexico_News', posts: [] },
                { name: 'MexicoFinanciero', posts: [] },
                { name: 'MemesMexico', posts: [] },
                { name: 'Guadalajara', posts: [] },
                { name: 'tijuana', posts: [] }
            ]
        },
        chile: {
            name: 'Chile',
            img: 'https://i.ibb.co/MZwVvGd/chile.png',
            subreddits: [
                { name: 'yo_ctm', posts: [] },
                { name: 'chile', posts: [] },
                { name: 'RepublicadeChile', posts: [] },
                { name: 'Santiago', posts: [] },
                { name: 'ChileCringe', posts: [] }
            ]
        },
        uruguay: {
            name: 'Uruguay',
            img: 'https://i.ibb.co/RvcttWk/uruguay.png',
            subreddits: [
                { name: 'CharruaDevs', posts: [] },
                { name: 'UruguayCirclejerk', posts: [] }
            ]
        }
    },
    isPending: false
};

const countriesSlice = createSlice({
    name: 'countriesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountry.pending, (state) => {
                state.isPending = true;
            })
            .addCase(fetchCountry.fulfilled, (state, action) => {
                const { country, allSubCards } = action.payload;
                state.isPending = false;
                /* Select all subreddits of that country */
                state.countriesData[country].subreddits.forEach((subreddit) => {
                    const matchingSubCards = allSubCards.find(({ sub }) => sub === subreddit.name);
                    if (matchingSubCards) {
                        /* Add cards in that subreddit and it'll add those that are not duplicated */
                        subreddit.posts = [
                            ...subreddit.posts,
                            ...matchingSubCards.cards.filter(
                                (card) => !subreddit.posts.some((post) => post.id === card.id) && !card.text.includes('https')
                            )
                        ];
                    }
                });
            })
            .addCase(fetchCountry.rejected, (state, action) => {
                state.isPending = false;
                console.error('Error fetching country data:', action.error);
            });
    }
});

export const selectCountries = (state) => state.countriesSlice.countriesData;
export const selectIsLoading = (state) => state.countriesSlice.isPending;

export default countriesSlice.reducer;