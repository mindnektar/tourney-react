import React, { Component, PropTypes } from 'react';

class PlayerInput extends Component {
    render() {
        return (
            <input
                onChange={event => this.props.changePlayerName(this.props.index, event.target.value)}
                ref="input"
                type="text"
                value={this.props.name}
            />
        );
    }

    componentDidMount() {
        this.refs.input.focus();
    }
}

PlayerInput.propTypes = {
    changePlayerName: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default PlayerInput;
