import React, { Component, PropTypes } from 'react';

class PlayerInput extends Component {
    componentDidMount() {
        this.refs.input.focus();
    }

    keyDown(event) {
        if (event.which === 13) {
            event.preventDefault();
            this.props.addPlayer();
        }
    }

    render() {
        return (
            <input
                maxLength="80"
                onChange={event => this.props.changePlayerName(this.props.index, event.target.value)}
                onKeyDown={event => this.keyDown(event)}
                ref="input"
                type="text"
                value={this.props.name}
            />
        );
    }
}

PlayerInput.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default PlayerInput;
