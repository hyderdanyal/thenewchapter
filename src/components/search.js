import React from 'react'
import "../Styles/searchStyle.css";
import ReactLiveSearch from 'react-live-search'

export default class Search extends React.Component {

    state = {
        value: '',
        data: [
            { label: 'test', value: 1 },
            { label: 'work', value: 2 },
            { label: 'great', value: 3 },
            { label: 'bar', value: 4 },
            { label: 'foo', value: 5 }
        ]
    };

    onChange = value => {
        this.setState({
            value
        });
    };

    onSelect = v => {
        console.log(v)
    };


    render() {
        return (


            <ReactLiveSearch style={{
                backgroundColor: "#fead03"
            }}
                value={this.state.value}
                onChange={this.onChange}
                onSelect={this.onSelect}
                data={this.state.data}
            />
        )
    }


    // style={{
    //     position: "absolute",
    //     margin: "auto",
    //     top: '0',
    //     right: '0',
    //     bottom: '0',
    //     left: '0',
    //     width: '60px',
    //     height: '60px',
    //     background: '#fead03',
    //     borderRadius: '50%',
    //     transition: 'all 1s',
    //     zIndex: '4',
    //     boxShadow: ' 0 0 25px 0 rgba(0, 0, 0, 0.4)'
    // }}


    // render() {
    //     return (

    //         <div class="container">
    //             <input type="text" placeholder="Search for your book..."></input>
    //             <div class="search"></div>
    //         </div>


    //     );
    // }
}































