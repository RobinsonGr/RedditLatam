export default function MenuCountry ({isMobile}) {

    const listFakeCountry = [
     {name: 'Colombia', img: 'https://i.ibb.co/PYm1N9X/colombia.png'}, 
    {name: 'Argentina', img: 'https://i.ibb.co/0Kxv5cd/argentina.png'},
     {name: 'México', img: 'https://i.ibb.co/fdb5R0v/mexico.png'}, 
     {name: 'Chile', img: 'https://i.ibb.co/MZwVvGd/chile.png'}, 
     {name: 'Uruguay', img: 'https://i.ibb.co/RvcttWk/uruguay.png'}];

    return (
        <div className={`${isMobile ? '' : 'hidden'} md:flex flex-col col-start-2 p-4 pl-7 rounded-lg text-neutral-500`}>
            <h2 className="mb-5 text-2xl font-bold">Países</h2>
            <ul>
        {listFakeCountry.map(({name, img}) => 
            <li key={name} className="flex items-center mb-8">
                <img className='h-10 w-10' src={img} alt={`Bandera de ${name}`}></img>              
                <span className="ml-3 text-lg font-bold">
                {name}
                </span>
            </li>
        )}
        </ul>
        </div> 
    )

}