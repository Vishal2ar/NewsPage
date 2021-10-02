import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Load from './Load';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {

    static defaultProps = {
        country : "in",
        category : "sports",
        pageSize : 8,
        totalResults :0 

       }
    static propTypes = {
    country : propTypes.string,
    category : propTypes.string,
    pageSize : propTypes.number
    }   
    artical = [
        
    ];
 
    
constructor(props){
    super(props)
    console.log("Test const");
    this.state ={
    artical : this.artical,
    loading: false,
    page:1,
    apiKey:this.props.apiKey
   
    }
    document.title = `${this.capitalizeFirstChar(this.props.category)} News`;
    console.log(this.state.apiKey);
}
capitalizeFirstChar =(word) =>{
  let  a = word[0].toUpperCase();
    a = a + word.slice(1);
    return a;
}
  async componentDidMount(){
   this.updateNews()
   }
   prevPage = async() => { 
   this.setState({page : this.state.page - 1}) 
   this.updateNews()                   
} 
   nextPage = async() => {
  this.setState({page : this.state.page + 1}) 
  this.updateNews()
} 
fetchMoreData = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24d6a642922c49cbbc6a85c1614e390b&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    this.setState({loading:true});
     let data = await fetch(url);
     let parsedData = await data.json();
    this.setState({artical:this.state.artical.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading:false,
    page : this.state.page +1})

     ;

}
updateNews = async(props) =>{
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24d6a642922c49cbbc6a85c1614e390b&pageSize=${this.props.pageSize}&page=1`;
    this.setState({loading:true});
     let data = await fetch(url);
     let parsedData = await data.json();
    this.setState({artical:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
     ;
     console.log(url);
     console.log(parsedData.articles);
     console.log(this.props.apiKey);
     this.props.setProgress(100);
}
    render() {
       
        return (
            <div>
                <div className="container ">
                    <h1 className="text-center" style={{margin:"40px"}}>{this.capitalizeFirstChar(this.props.category)} News</h1>
               {/* <div className="text-center">{this.state.loading&&<Load />}</div> */}
               <InfiniteScroll
                    dataLength={this.state.artical.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.artical.length !== this.state.totalResults}
                    loader={<Load />}
                    >
               <div className="row">
               {this.state.artical.map((e)=>{
            return(     
                <div className="col-md-3" key={e.url} >
                <Newsitem headline = {e.title?e.title:""} 
                artical={e.description?e.description.slice(0,20):""} 
                imageUrl={e.urlToImage}
                 url={e.url} 
                 author={e.author}
                 old={e.publishedAt} 
                 source={e.source.name} />
                </div>
            );
            })}
               
               {/* <!--div className="Container d-flex  justify-content-between my-5">
                <button type="button" disabled={this.state.page <= 1} className="btn  btn-dark" onClick={this.prevPage}>&larr; Prev</button>
                <button type="button" disabled={Math.ceil(this.state.totalResults/this.props.pageSize) <= this.state.page} className="btn  btn-dark"onClick={this.nextPage}>Next &rarr;</button>
                </div --> */}
                </div>
                </InfiniteScroll>
                </div> 
                
            </div>
        )
    }
}
