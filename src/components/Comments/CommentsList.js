
import Comment from "./Comment"

export default function CommentsList ({currentComments}) {

    if(!currentComments) {
        return <p>{":("}</p>
    }
    return (
    <div className="m-w-4/5">
        <ul className="m-w-full">
            {currentComments.map(commentData => {
               return (
                <li className="mb-4">
                <Comment commentData={commentData}/>
               {
                   /*using recursive component for nested comments (replies)*/
                    Boolean(commentData.replies) && (
                        <div className="ml-7 mt-2"> 
                        
                            <CommentsList currentComments={commentData.replies}/>  
                         </div>
                   )
                }
           </li>
               )
            })}
        </ul>
    </div>
    )
}