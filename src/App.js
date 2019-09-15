import React from 'react';
import axios from 'axios';
import GithubTimeline from './GithubTimeline';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.loadTimeline = this.loadTimeline.bind(this);
        this.state = {
            username: '',
            loading: false,
            repos: []
        };
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    async loadTimeline() {
        const { username } = this.state;
        const apiUrl = `https://api.github.com/users/${username}/repos`;
        this.setState({
            loading: true
        });
        try {
            const res = await axios.get(apiUrl);
            if (res.status == 200) {
                this.setState({
                    loading: false,
                    repos: res.data
                });    
            }
        } catch (error) {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const isLoading = this.state.loading;
        const repos = this.state.repos;
        return (
            <div className="container no-padding">
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Github username" onChange={this.handleUsername} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.loadTimeline}>Load Timeline</button>
                        </div>
                    </div>
                </div>
                {
                    isLoading ? (<div className="loader">
                        <div className="spinner-border" role="status" />
                    </div>) : null
                }
                {
                    repos && repos.length > 0 ? <GithubTimeline repos={repos} /> : <p>No repositories found</p>
                }
            </div>
        );
    }
}