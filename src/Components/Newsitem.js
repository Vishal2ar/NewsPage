import React, { Component } from 'react'

export default class Newsitem extends Component {
    
    render() {
        let {headline,artical,imageUrl,url,author,old,source} = this.props;
        return (
            <div>
                 
                <div className="card my-2" >
                <div style={{display:'flex',
                            justifyContent: 'right',
                            position: 'absolute',
                            right: '0'}}>
                <span class="badge rounded-pill bg-danger" style={{zIndex:"1",Left :90}}>{source}  </span>
                </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{headline}...</h5>
                    <p class="card-text"><small class="text-muted">By {author?author:"Unknown"} on {old}</small></p>
                    <p className="card-text">{artical}...</p>
                    <a href={url} target="_blank" rel="noreferrer"  className="btn btn-dark btn-sm btn-primary">Read</a>
                    </div>
                </div>
            </div>
        )
    }
}