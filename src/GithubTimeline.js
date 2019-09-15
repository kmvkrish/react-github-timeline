import React, { Component } from 'react';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import moment from 'moment';

export default class GithubTimeline extends Component {
    constructor(props) {
        super(props);
    }

    renderTimelineRows() {
        return this.props.repos.map(repo => {
            return (<VerticalTimelineElement key={repo.node_id} className="vertical-timeline-element--work"
                contentStyle={{ background: 'white', color: 'black' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={moment(repo.created_at).format("DD-MM-YYYY")}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<span className="fas fa-code fa-lg"/>}
                style={{color: 'blue'}}>
                <h3 className="vertical-timeline-element-title">{repo.name}</h3>
                <p>
                    {repo.description}
                </p>
                <br/>
                <a href={repo.html_url} target="_blank">
                    <button className="btn btn-secondary">View Source</button>
                </a>
            </VerticalTimelineElement>);
        });
    }

    render() {
        const { repos } = this.props;

        return (
            <div>
                {
                    repos.length == 0 ? <p>No repos found</p> : (
                        <VerticalTimeline>
                            {this.renderTimelineRows()}
                        </VerticalTimeline>
                    )
                }
            </div>
        );
    }
}