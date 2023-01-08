import './search-box.styles.css'

const searchBox = (props) =>{
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