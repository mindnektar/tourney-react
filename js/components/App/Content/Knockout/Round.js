import React, { Component, PropTypes } from 'react';

class Round extends Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

Round.propTypes = {
    changeScore: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
};

export default Round;
