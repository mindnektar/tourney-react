import React, { Component, PropTypes } from 'react';

class StartButton extends Component {
    render() {
        return (
            <div className="start">
                <button onClick={this.props.start}>Start the tourney!</button>
            </div>
        );
    }
}

StartButton.propTypes = {
    start: PropTypes.func.isRequired,
};

export default StartButton;
