
import Comment from "./Comment"

export default function CommentsList ({currentComments}) {

    const commentsClean = currentComments.filter(commentData => !commentData.comment?.includes('https'))

    return (
    <div className="m-w-4/5 mt-4">
        <ul className="m-w-full">
            {commentsClean.map(commentData => {
               return (
                <li key={commentData.comment} className="mb-4">
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