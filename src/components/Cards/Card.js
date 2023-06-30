import { useDispatch, useSelector } from "react-redux";
import { commentsSelector } from "../../features/commentsSlice";
import { useEffect, useState } from "react"
import { fetchComments } from "../../features/commentsSlice"
import CommentsList from "../Comments/CommentsList";


export default function Card ({card}) {
    const [vote, setVote] = useState('')
    const [commentsBox, setCommentsBox] = useState(null)
 
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
    useEffect(() => {
        dispatch(fetchComments({sub: card.sub, card: card.id}))
    }, [])    

    const currentComments = commentsList[card.id];
    
    const handleArrowUp = () => {
        (vote == 'down'|| vote == null) ? setVote('up') : setVote(null)
    }
    
    const handleArrowDown = () => {
        (vote == 'up' || vote == null) ? setVote('down') : setVote(null)
    }



    return (
        /*arrows up and down */

        <div className="card mb-4 p-3 rounded-lg bg-white "> 

            <span className="absolute top-20 w-20 h-7 text-center bg-green-500 text-white">{`r/${card.sub}`}</span>
            <div className="col-span-1">
                <img 
                className="w-11"
                onClick={handleArrowUp} 
                src={ vote === 'up' ? arrows.up : arrows.neutral}/>
                <p>{card.ups}</p>
                <img className="w-11 transform scale-y-[-1]" 
                onClick={handleArrowDown} 
                src={ vote == 'down' ? arrows.down : arrows.neutral} />
            </div>

            <div> 
                <h1 className="text-lg font-bold">{card.title}</h1>
                {
                    Boolean(card.url) && (
                        <img className='w-full h-auto' src={card.url}>
                        </img>
                    )
                }
                {card.text.length > 40 && (
                    <p>{card.text}</p>
                )}
                <hr/>
                {/* {
                    Boolean(currentComments) && (
                        <div> 
                        <span>💬</span>
                        <p>{currentComments.length}</p>

                        <p>here are the comments</p>
                        <CommentsList currentComments={currentComments}/>
                        </div>
                    )
                } */}
            </div>
        </div>
    )
}

