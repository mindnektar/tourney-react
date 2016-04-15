import React, { Component, PropTypes } from 'react';
import DeletePlayer from './EditPlayers/DeletePlayer';
import PlayerInput from './EditPlayers/PlayerInput';

class EditPlayers extends Component {
    componentDidUpdate() {
        if (this.refs.lastInput && !document.activeElement) {
            this.refs.lastInput.focus();
        }
    }

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
                                addPlayer={this.props.addPlayer}
                                changePlayerName={this.props.changePlayerName}
                                index={index}
                                name={player.name}
                            />

                            <DeletePlayer
                                deletePlayer={() => this.props.deletePlayer(index)}
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
}

EditPlayers.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
};

export default EditPlayers;
