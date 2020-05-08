import React,{useState,useCallback} from 'react';
import {AsyncTypeahead} from "react-bootstrap-typeahead";
// import 'react-bootstrap-typeahead/css/Typeahead.css';
// import AsyncExample from "react-bootstrap-typeahead"
// import "../Styles/searchStyle.css";
// import ReactLiveSearch from 'react-live-search'


//   export default class Search extends React.Component {
  

//     render() {
     
//             }
//     };

    
    // const SEARCH_URI = 'https://api.github.com/search/users';
    const SEARCH_URI = 'http://127.0.0.1:5000/search'

    const Search = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [options, setOptions] = useState([]);
    
      const handleSearch = useCallback((query) => {
        setIsLoading(true);
        // +in:login&page=1&per_page=50
        fetch(`${SEARCH_URI}?q=${query}`)

          .then((resp) => resp.json())
          .then(( items ) => {
            const options = items.map((i) => ({
                
              avatar_url: i.ImgURL,
              id: i.Bookid,
              login: i.Title,
            }));
            // console.log("OPTIONS::",options)
            setOptions(options);
            setIsLoading(false);
          });
      });
      return (
        <AsyncTypeahead
          style={{height:"30px",width:"100px",position:""}}
          id="async-example"
          isLoading={isLoading}
          labelKey="login"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          placeholder="Search Book..."
          renderMenuItemChildren={(option, props) => (
            <div style={{background:"white"}}>
              <img
                alt={option.login}
                src={option.avatar_url}
                style={{
                  height: '24px',
                  marginRight: '10px',
                  width: '24px',
                }}
              />
              <span>{option.login}</span>
            </div>
          )}
        />
      );
    }
export default Search












//     state = {
//         value: '',
//         data: [
//             { label: 'test', value: 1 },
//             { label: 'work', value: 2 },
//             { label: 'great', value: 3 },
//             { label: 'bar', value: 4 },
//             { label: 'foo', value: 5 }
//         ]
//     };

//     onChange = value => {
//         this.setState({
//             value
//         });
//     };

//     onSelect = v => {
//         console.log(v)
//     };


//     render() {
//         return (


//             <ReactLiveSearch style={{
//                 backgroundColor: "#fead03"
//             }}
//                 value={this.state.value}
//                 onChange={this.onChange}
//                 onSelect={this.onSelect}
//                 data={this.state.data}
//             />
//         )
//     }



// }































