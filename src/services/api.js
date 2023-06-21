


export async function getCardsApi (sub) {

   try {
    const cardsResponse = await fetch(`https://www.reddit.com/r/${sub}/top.json`);

    const cardsDataRaw = await cardsResponse.json()

    
    const cardsData =  cardsDataRaw.data.children.map(({data}) => 
    ({id: data.id, text: data.selftext, ups: data.ups, downs: data.downs, title: data.title}))

    console.log(cardsData)
    return cardsData

   } catch (err) {
    return err
   }

}

