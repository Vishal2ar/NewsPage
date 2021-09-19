import React, { Component } from 'react'

export default class Newsitem extends Component {
    
    render() {
        let {headline,artical,imageUrl,url} = this.props;
        return (
            <div>
                 
                <div className="card" >
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{headline}...</h5>
                    <p className="card-text">{artical}...</p>
                    <a href={url} target="_blank" rel="noreferrer"  className="btn btn-dark btn-sm btn-primary">Read</a>
                    </div>
                </div>
            </div>
        )
    }
}