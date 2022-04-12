import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: '',
    };

    onLabelSearch = (e) => {
        const newLabel = e.target.value;
        this.setState(
            {term: newLabel}
        )
        this.props.onLabelSearch(newLabel);
    }

    render() {
        return (

            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.onLabelSearch}
                   value={this.state.term}
            />
        )
    };
};

