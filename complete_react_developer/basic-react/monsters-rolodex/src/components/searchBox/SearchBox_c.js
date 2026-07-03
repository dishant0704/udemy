import React, { Component } from 'react'
import './search-box.styles.css'

export class searchBox extends Component {
  render() {
    const {cssClass, onChange, placeholder} = this.props
    return (
      <div>
        <input 
            className= {`search-box ${cssClass}`}
            type='search'
            placeholder= {placeholder}
            onChange={onChange}                
            />
      </div>
    )
  }
}

export default searchBox