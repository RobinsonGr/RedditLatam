
export default function Comment ({commentData}) {
    
    return (
        <div className="shadow-md hover:shadow-lg p-3 bg-gray-50">
            <p className="text-fuchsia-700 font-semibold">{commentData.user}</p>
            <p>{commentData.comment}</p>    
        </div>
    )
} 