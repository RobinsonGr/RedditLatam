import { useDispatch, useSelector } from "react-redux";
import { commentsSelector } from "../../features/commentsSlice";
import { useEffect, useState } from "react"
import { fetchComments } from "../../features/commentsSlice"
import CommentsList from "../Comments/CommentsList";


export default function Card ({card}) {
    const [vote, setVote] = useState(null)
    const [commentsBox, setCommentsBox] = useState(false)
 
    const commentsList = useSelector(commentsSelector)
    const dispatch = useDispatch();
    const arrows = {
        up: '/arrows/redditlatam-arrow-green.svg',
        down: '/arrows/redditlatam-arrow-red.svg',
        neutral: '/arrows/redditlatam-arrow-neutral.svg',
    }
    

    /* get the comments of the actual card,
     I've used useEffect because in the normal behiavor, there are many
    re-renders and here with useEffect avoid duplicateds and
    unnecesary dispatch's, this only will work in the initial first render (componentdidmountend)*/
    // useEffect(() => {
    //     dispatch(fetchComments({sub: card.sub, card: card.id}))
    // }, [card.id, card.sub, dispatch])    

    // const currentComments = commentsList[card.id];
    
    const handleArrowUp = () => {
        (vote === 'down'|| vote === null) ? setVote('up') : setVote(null)
    }
    
    const handleArrowDown = () => {
        (vote === 'up' || vote === null) ? setVote('down') : setVote(null)
    }


    return (       
        
        <div className="card relative mb-4 p-3 rounded-lg bg-white "> 

            <span className="absolute left-1 -top-3 w-auto h-auto text-center bg-green-500 text-white">
            {/*Arrows */}
                {`r/${card.sub}`}</span>
                
            <section className="col-span-1 cursor-pointer">
                <img 
                alt='arrow'
                className="w-11 h-9"
                onClick={handleArrowUp} 
                src={ vote === 'up' ? arrows.up : arrows.neutral}/>

                <p 
                className={`font-bold text-center
                ${vote === 'up' ? 'text-green-600' : vote === 'down' ? 'text-red-600' : null }`}>

                {vote === 'up' ? (card.ups + 1) : vote === 'down' ? (card.ups - 1) : (card.ups)}</p>

                <img className="w-11 h-9 transform scale-y-[-1]" 
                alt='arrow-down'
                onClick={handleArrowDown} 
                src={ vote === 'down' ? arrows.down : arrows.neutral} />
            </section>

             {/* Card with title, img -- grid template was generate a bug when a image is clicked */}
            <section> 
                
                <h1 className="text-base font-bold">{card.title}</h1>
                {
                    Boolean(card.url) && (
                        <img className='w-full h-auto' alt={card.title} src={card.url}>
                        </img>
                    )
                }
                
                <p>{card.text}</p>
            
                <hr className="my-3"/>
                {/* <div className="flex justify-between flex-wrap"> 
                    <p className="font-semibold text-green-latam">{card.author}</p>
                    {
                        Boolean(currentComments) && (
                            <div className="flex" onClick={() => setCommentsBox(!commentsBox)}>  
                            <span className="mr-1" >💬</span>
                            <p className="text-gray-500">{currentComments.length}</p>
                            </div>                     
                           
                        )
                    } 
                </div> */}
                {
                    //  commentsBox && (
                    //     <CommentsList currentComments={currentComments}/>
                    // )
                }

                
            </section>
        </div>
    )
}

