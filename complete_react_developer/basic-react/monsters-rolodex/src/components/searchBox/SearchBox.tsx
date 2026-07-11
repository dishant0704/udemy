import './search-box.styles.css'
import {ChangeEvent } from 'react'

interface ISearchBoxProps extends IChnageHandlerProps{
  cssClass: string
  placeholder?: string  
}

interface IChnageHandlerProps{ 
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const searchBox = (props:ISearchBoxProps) =>{
 const {cssClass, onChange, placeholder} = props
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

export default searchBox