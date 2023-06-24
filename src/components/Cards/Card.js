
export default function Card ({card}) {

    return (
        <div className="mb-4 p-3 rounded-lg bg-white "> 
        <span className="bg-green-500 text-white">{`r/${card.sub}`}</span>
            <h1 className="text-lg font-bold">{card.title}</h1>

            {
                Boolean(card.url) && (
                    <img src={card.url}>
                    </img>
                )
            }
            <p>{card.text}</p>
        </div>
    )
}

