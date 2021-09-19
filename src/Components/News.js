import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Load from './Load';
import propTypes from 'prop-types';

export default class News extends Component {

    static defaultProps = {
        country : "in",
        category : "sports",
        pageSize : 8,

       }
    static propTypes = {
    country : propTypes.string,
    category : propTypes.string,
    pageSize : propTypes.number
    }   
    artical = [
        
    ];
 
    
constructor(){
    super()
    console.log("Test const");
    this.state ={
    artical : this.artical,
    loading: false,
    page:1,
   
    }
}
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country =${this.props.country}&category=${this.props.category}&apiKey=24d6a642922c49cbbc6a85c1614e390b&pageSize=${this.props.pageSize}&page=2`;
   this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
   this.setState({artical:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    ;
   }
   prevPage = async() => { console.log("Prev Page");
   let url = `https://newsapi.org/v2/top-headlines?country =${this.props.country}&category=${this.props.category}&apiKey=24d6a642922c49cbbc6a85c1614e390b&pageSize=${this.props.pageSize}&page=${this.state.page-1}`;
   this.setState({loading:true});
   let data = await fetch(url);
   let parsedData = await data.json();
  this.setState({artical:parsedData.articles,page: this.state.page-1,loading:false});                          
} 
   nextPage = async() => { console.log("Next Page");
   let url = `https://newsapi.org/v2/top-headlines?country =${this.props.country}&category=${this.props.category}&apiKey=24d6a642922c49cbbc6a85c1614e390b&pageSize=${this.props.pageSize}&page=${this.state.page +1}`;
   this.setState({loading:true});
   let data = await fetch(url);
   let parsedData = await data.json();
  this.setState({artical:parsedData.articles,page: this.state.page+1,loading:false});   
} 

    render() {
       
        return (
            <div>
                <div className="container ">
                    <h1 className="text-center" style={{margin:"40px"}}>THis is News</h1>
               <div className="text-center">{this.state.loading&&<Load />}</div>
               
               <div className="row">
               {this.state.artical.map((e)=>{
            return(     
                <div className="col-md-3" key={e.url} >
                <Newsitem headline = {e.title?e.title.slice(0,40):""} 
                artical={e.description?e.description.slice(0,20):""} 
                imageUrl={e.urlToImage}
                 url={e.url} />
                </div>
            );
            })}
               
               <div className="Container d-flex  justify-content-between my-5">
                <button type="button" disabled={this.state.page <= 1} className="btn  btn-dark" onClick={this.prevPage}>&larr; Prev</button>
                <button type="button" disabled={Math.ceil(this.state.totalResults/this.props.pageSize) <= this.state.page} className="btn  btn-dark"onClick={this.nextPage}>Next &rarr;</button>
                </div>
                </div>
                </div> 
                
            </div>
        )
    }
}
