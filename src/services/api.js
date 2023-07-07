
export async function getCardsApi (sub) {

   try {
    const cardsResponse = await fetch(`https://www.reddit.com/r/${sub}/top.json`);
    const cardsDataRaw = await cardsResponse.json()
    const cardsData =  cardsDataRaw?.data?.children?.map(({data}) => 
    ({id: data.id, 
      url: data.url_overridden_by_dest
       && data.url_overridden_by_dest.includes('i.redd.it') ? data.url_overridden_by_dest : undefined, 
      sub, text: data.selftext, 
      ups: data.ups,  
      author: data.author,
      title: data.title}))
      return cardsData


   } catch (err) {
    console.log(err)
   }
}

export async function getComments ({sub, card}) {

   const response = await fetch(`https://www.reddit.com/r/${sub}/comments/${card}.json`);
   const json = await response.json();

   const comments = json[1].data.children.map(({data}) => {
     const replies = data.replies.data?.children.map(({data}) => ({comment: data.body, user: data.author}))
      return {comment: data.body, user: data.author, replies}
   })

  

   return comments
} 
