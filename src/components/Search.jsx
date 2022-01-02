import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Book from './Book';


export class Search extends Component {
    state = {
        searchedlist: [],
        query: '',
        UpdateBooks:this.props.UpdateBooks,
    }
    handleChange = (e) => {
        let query = e.currentTarget.value;
        this.setState({ query });
        this.Searchlist(query.trim());
    }
    
    Searchlist = (query) => {
       if (!query) {
      this.setState({ searchedlist: [] });
      return;
    }
        BooksAPI.search(query).then(books => {
          if (!books || books.error) {
          this.setState({
            searchedlist: [],
            error: "No books were found, please change your search term"
          });
          return;
        }
         this.setState({ searchedlist: books })
       //  console.log(this.state.searchedlist)
    }).catch(err => {
        this.setState({
          searchedlist: [],
          error:
            "There was an error searching for books, please check your connection"
        });
      });
  }

    render() {
       
        return (
            <Fragment>
               
                <div className="search-books">
                    <div className="search-books-bar">
                       
                        <Link className="close-search" to='/library'>close</Link>
                    <div className="search-books-input-wrapper">
                       <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>

                    </div>
                    </div>
                    <div className="search-books-results">
                       
                        <ol className="books-grid">
                            {
                                this.state.searchedlist.map(book => <Book key={book.id} book={book} UpdateBooks={this.state.UpdateBooks} />)
                            }
                           
                        </ol>
                    </div>
                </div>
             </Fragment>    
        )
               
           
        
    }
}

export default Search
