import React, { Component, PropTypes } from 'react';
import EditOptions from './Prep/EditOptions';
import EditPlayers from './Prep/EditPlayers';

class Prep extends Component {
    render() {
        return (
            <div className="prep">
                <div className="column-container">
                    <EditPlayers
                        addPlayer={this.props.addPlayer}
                        changePlayerName={this.props.changePlayerName}
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
    cutoff: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    winsPerMatch: PropTypes.array.isRequired,
};

export default Prep;
