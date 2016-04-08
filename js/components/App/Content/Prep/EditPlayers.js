import React, { Component, PropTypes } from 'react';
import PlayerInput from './EditPlayers/PlayerInput';

class EditPlayers extends Component {
    render() {
        return (
            <div className="column">
                <h2>Players</h2>

                <div className="players">
                    {this.props.players.map((player, index) =>
                        <div
                            className="player"
                            key={index}
                        >
                            <PlayerInput
                                changePlayerName={this.props.changePlayerName}
                                index={index}
                                name={player.name}
                            />
                        </div>
                    )}

                    <div
                        className="player add"
                        onClick={this.props.addPlayer}
                    >
                        +
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.refs.lastInput && !document.activeElement) {
            this.refs.lastInput.focus();
        }
    }
}

EditPlayers.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
};

export default EditPlayers;
