import React, { Component, PropTypes } from 'react';
import EditOptions from './Prep/EditOptions';
import EditPlayers from './Prep/EditPlayers';

class Prep extends Component {
    formattedDuration() {
        let hours = `${Math.floor(this.props.duration / 60)}`;
        let minutes = `${this.props.duration % 60}`;

        if (hours.length === 1) {
            hours = `0${hours}`;
        }

        if (minutes.length === 1) {
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    }

    render() {
        return (
            <div className="prep">
                <div className="column-container">
                    <EditPlayers
                        addPlayer={this.props.addPlayer}
                        changePlayerName={this.props.changePlayerName}
                        deletePlayer={this.props.deletePlayer}
                        players={this.props.players}
                    />

                    <EditOptions
                        changeCutoff={this.props.changeCutoff}
                        changeGroupCount={this.props.changeGroupCount}
                        changeWinsPerMatch={this.props.changeWinsPerMatch}
                        cutoff={this.props.cutoff}
                        groupCount={this.props.groups.length}
                        playerCount={this.props.players.length}
                        winsPerMatch={this.props.winsPerMatch}
                    />
                </div>

                <div
                    className="create-tourney"
                    onClick={() => this.props.createTourney()}
                >
                    Create tourney
                </div>

                {this.props.duration &&
                    <div className="duration">
                        {`Estimated duration: ${this.formattedDuration()}`}
                    </div>
                }
            </div>
        );
    }
}

Prep.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeCutoff: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    changeWinsPerMatch: PropTypes.func.isRequired,
    createTourney: PropTypes.func.isRequired,
    cutoff: PropTypes.number.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    duration: PropTypes.number,
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    winsPerMatch: PropTypes.array.isRequired,
};

export default Prep;
