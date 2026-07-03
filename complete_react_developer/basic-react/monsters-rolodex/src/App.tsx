import {useState,useEffect, ChangeEvent } from 'react';
import './App.css';
import CardList from './components/cardList/CardList';
import SearchBox from './components/searchBox/SearchBox';
import {getData} from './utils/data.utils'

export type Monster = {
    id: string;
    name: string;
    email: string
}

const App = () => {

    const [searchField, setSearchField] = useState('');
    const [title, setTitle] = useState('Monsters Rolodex');
    const [monsters, setMonsters] = useState<Monster[]>([]);

    useEffect(()=>{
        const fetchUser = async () =>{

            const user = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
            setMonsters(user)
        }
        fetchUser();
    },[])  

    const onSearchChange = (event:ChangeEvent<HTMLInputElement>):void => {
        const serchFieldsString = event.target.value.toLocaleLowerCase();
        setSearchField(serchFieldsString);
    }

    const onTitleChange = (event:ChangeEvent<HTMLInputElement>):void => {
        const serchFieldsString = event.target.value.toLocaleLowerCase();
        setTitle(serchFieldsString);
    }

    const filteredMonsters = monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
        <div className="App">
            <h1 className='app-title'>{title}</h1>
            <SearchBox cssClass="monster-search-box" onChange={onSearchChange} placeholder="Search List" />
            <br/>
            <SearchBox cssClass="Title-search-box" onChange={onTitleChange} placeholder="Set a title" />
            <CardList Monster={filteredMonsters} />
        </div>
    )
}

// class App extends Component{
//     constructor(){
//         super();
//         this.state = {
//             monsters:[],
//             serchField:''
//         }
//     }

//     componentDidMount(){
//         fetch('https://jsonplaceholder.typicode.com/users')
//         .then(respons => respons.json())
//         .then((user) =>
//         this.setState(
//             () => {
//                 return{monsters: user}
//             },
//             ()=>{
//                 console.log(this.state);
//             }
//         )
//         )
//     }
//     onSearchChange = (event) => {
//         const serchString  = event.target.value.toLocaleLowerCase();

//        this.setState(()=>{
//         return{serchField: serchString}
//        })
//     }

//     render(){

//         const {monsters, serchField} = this.state
//         const {onSearchChange} = this

//         const filteredMonsters = monsters.filter((monster)=>{
//             return monster.name.toLocaleLowerCase().includes(serchField);
//         });
//         return(
//             <div className="App">
//                 <h1 className='app-title'>Monsters Rolodex</h1>
//                 <SearchBox cssClass="monster-search-box" onChange={onSearchChange} placeholder="Search List"/>                
//                 <CardList listData={filteredMonsters} />
//             </div>
//         )
//     }

// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
