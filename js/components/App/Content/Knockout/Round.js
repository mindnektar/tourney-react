import React, { Component, PropTypes } from 'react';

class Round extends Component {
    render() {
        return (
            <div className="column-container">
                <Round />
            </div>
        );
    }
}

Round.propTypes = {
    changeScore: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
};

export default Round;
