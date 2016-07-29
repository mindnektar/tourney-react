import React, { Component, PropTypes } from 'react';

class PlayerInput extends Component {
    render() {
        return (
            <div
                className="player-delete"
                onClick={this.props.deletePlayer}
            >
                <button className="player-delete-btn">+</button>
            </div>
        );
    }
}

PlayerInput.propTypes = {
    deletePlayer: PropTypes.func.isRequired,
};

export default PlayerInput;
