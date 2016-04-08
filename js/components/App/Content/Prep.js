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
                        changeGroupCount={this.props.changeGroupCount}
                        changeWinsPerMatch={this.props.changeWinsPerMatch}
                        groupCount={this.props.groups.length}
                        winsPerMatch={this.props.winsPerMatch}
                    />
                </div>
            </div>
        );
    }
}

Prep.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    changeWinsPerMatch: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    winsPerMatch: PropTypes.object.isRequired,
};

export default Prep;