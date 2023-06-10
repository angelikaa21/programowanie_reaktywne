import React, {Component} from "react";
import Pagination from "./common/pagination";
import PostsTable from "./postsTable";
import {paginate} from "../utils/paginate";
import _ from 'lodash';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageSize: 4,
            currentPage: 1
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    console.log(result)
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleDelete = (post) => {
        const posts = this.state.items.filter(p => p.id!==post.id);
        this.setState({items: posts});
    };

    render() {
        const {items, pageSize, currentPage} = this.state;


        if (!items.length) {
            return <p>Brak wpisów</p>
        }

        const posts = paginate(items, currentPage, pageSize);

        return (
        <React.Fragment>
            <PostsTable
                items={posts}
                onDelete={this.handleDelete}
                />
                <Pagination
                itemsCount={items.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
                />
            </React.Fragment>
)
    }
}

export default Posts;