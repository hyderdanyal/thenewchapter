import React from 'react'

class Background extends React.Component{
    
    state={
        hasLoaded:false,
        books:[],
        error:null
    }

    fetchBooks(){
        
        fetch("http://127.0.0.1:5000/authorbased?Title=The Hobbit")
                .then(response=>response.json())
                .then((data)=>{
                    
                    this.setState({
                        books:data,
                        hasLoaded:true
                    })
                    
                })
                .catch(error=>this.setState({
                    error,
                    hasLoaded:true}))
                
    }
    componentDidMount(){
        this.fetchBooks()
    }
    render(){
       
        const {hasLoaded,books,error}=this.state
       
        return(
        <React.Fragment>
            <h1>BOOKS</h1>
            {error?<p>{error.message}</p> : null}
            {hasLoaded ?(
                books.map(book=>{
                    const {Title,Bookid,ImgURL}=book
                    return(
                       <div key={Bookid}>
                           <p>Title:{Title}</p>
                           <p>ImgURL:{ImgURL}</p>
                           <img src={ImgURL}></img>
                       <hr />
                       </div> 
                    )
                })
            ):(<h3>Loading...</h3>)}
        </React.Fragment>
        )    
}
}
export default Background