import './card.styles.css'

const Card = ({cardData}) =>{
    const {id, name, email} = cardData
        return (
            <div className='card-container' key={id}>
                <img
                    alt={name}
                    src={`https://robohash.org/${id}?set=set2&size=180x180`}
                />
                <h1>{name}</h1>
                <p>{email}</p>
            </div>
        )
}

export default Card