
import Comment from "./Comment"

export default function CommentsList ({currentComments}) {

    if(!currentComments) {
        return <p>{":("}</p>
    }
    return (
        <ul>
            {currentComments.map(commentData => {
               return (
                <li>
                <Comment commentData={commentData}/>
               {
                   /*using recursive component for nested comments (replies)*/
                    Boolean(commentData.replies) && (
                        <div className="bg-red-100"> 
                        
                            <CommentsList currentComments={commentData.replies}/>  
                         </div>
                   )
                }
           </li>
               )
            })}
        </ul>
    )
}