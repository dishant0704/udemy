import React, { Component } from 'react'
import './card.styles.css'

export class Card extends Component {
    render() {
        const {id, name, email} = this.props.cardData
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
}

export default Card