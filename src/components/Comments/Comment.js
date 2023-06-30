
export default function Comment ({commentData}) {
    
    return (
        <div>
            <p>{commentData.user}</p>
            <p>{commentData.comment}</p>    
        </div>
    )
} 