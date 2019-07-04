import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import * as BookActionTypes from '../store/actions/books.actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBan } from '@fortawesome/free-solid-svg-icons';
library.add(faPaperPlane);
library.add(faBan);

export class BookForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            book: {
                id: undefined,
                name: "",
                description: "",
                author: "",
                photo: ""
            },
            creating: true,
            editing: false,
            viewing: false
        }
    }

    componentDidMount() {
        const bookId = this.props.history.location.pathname.split("/")[2];
        const books = this.props.initialValues;
        this.props.action.getBookAction(bookId)
            .catch(error => {
                toast("Error occured !");
            });
    }

    componentWillReceiveProps(nextProps) {
        const bookSelected = nextProps.selectedBook;
        this.setState(
            {
                book: {
                    id: bookSelected.id,
                    name: bookSelected.name,
                    description: bookSelected.description,
                    author: bookSelected.author,
                    photo: bookSelected.photo
                }
            }
        )
    }

    handleSave(values) {
        const book = {
            id: values.id,
            name: values.name,
            description: values.description,
            author: values.author,
            photo: values.photo,
        };

        this.props.action.saveBookAction(book)
            .then(() => {
                toast("Book Saved");
                this.props.history.push('/books');
            }).catch(error => {
                toast("Error occured");
            });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/books');
    }

    handleChange(event) {
        const param = event.nativeEvent.srcElement.id;
        switch (param) {
            case "id":
                this.setState(
                    {
                        book: {
                            id: event.target.value,
                            name: this.state.book.name,
                            description: this.state.book.description,
                            author: this.state.book.author,
                            photo: this.state.book.photo
                        }
                    }
                );
                break;
            case "name":
                this.setState({
                    book: {
                        id: this.state.book.id,
                        name: event.target.value,
                        description: this.state.book.description,
                        author: this.state.book.author,
                        photo: this.state.book.photo
                    }
                }
                );
                break;
            case "description":
                this.setState({
                    book: {
                        id: this.state.book.id,
                        name: this.state.book.name,
                        description: event.target.value,
                        author: this.state.book.author,
                        photo: this.state.book.photo
                    }
                });
                break;
            case "author":
                this.setState(
                    {
                        book: {
                            id: this.state.book.id,
                            name: this.state.book.name,
                            description: this.state.book.description,
                            author: event.target.value,
                            photo: this.state.book.photo
                        }
                    }
                );
                break;
            case "photo":
                this.setState(
                    {
                        book: {
                            id: this.state.book.id,
                            name: this.state.book.name,
                            description: this.state.book.description,
                            author: this.state.book.author,
                            photo: event.target.value
                        }
                    }
                );
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const book = {
            id: this.state.book.id,
            name: this.state.book.name,
            description: this.state.book.description,
            author: this.state.book.author,
            photo: this.state.book.photo,
        };
        this.props.action.saveBookAction(book)
            .then(() => {
                toast("Book Saved");
                this.props.history.push('/books');
            }).catch(error => {
                toast("Error occured");
            });
    }

    handleReset(event) {
        //TODO
    }

    render() {
        const { initialValues } = this.props.initialValues;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" value={this.state.book.name} onChange={this.handleChange} id="name" aria-describedby="nameHelp" placeholder="Enter Name" />
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea type="text" class="form-control" rows="5" value={this.state.book.description} onChange={this.handleChange} id="description" aria-describedby="descriptionHelp" placeholder="Enter Description" />
                    </div>

                    <div class="form-group">
                        <label for="author">Author</label>
                        <input type="text" class="form-control" value={this.state.book.author} onChange={this.handleChange} id="author" aria-describedby="authorHelp" placeholder="Enter Author Full Name" />
                    </div>

                    <div class="form-group">
                        <label for="photo">Photo</label>
                        <input type="text" class="form-control" value={this.state.book.photo} onChange={this.handleChange} id="photoUrl" placeholder="photo URL" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    </div>

                    <div class="float-right">
                        <button type="submit" className="btn btn-primary" onClick={this.handleDeleteClick}><FontAwesomeIcon icon='paper-plane' /> Submit</button>
                        <button type="button" className="btn btn-default btn-space" onClick={this.handleCancel}><FontAwesomeIcon icon='ban' /> Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    debugger;
    const bookId = ownProps.location.pathname.split("/")[2];
    return {
        initialValues: state.booksReducer.books,
        selectedBook: state.booksReducer.selectedBook
    }
};

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(BookActionTypes, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);