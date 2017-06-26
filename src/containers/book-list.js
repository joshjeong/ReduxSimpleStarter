import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return (
                <li
                    key={book.title}
                    onClick={() => this.props.selectBook(book)}
                    className="list-group-item">
                    {book.title}
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                { this.renderList() }
            </ul>
        )
    }
}

// this is where magic happens
// state is coming from reducer/index.js
// converts state to props
function mapStateToProps(state) {
    return {
        books: state.books
    };
}

// anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
    // whenever select book is called. dispatch will send the result to
    // all of our reducers
    return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
