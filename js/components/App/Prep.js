import React, { Component, PropTypes } from 'react';
import EditOptions from './Prep/EditOptions';
import EditPlayers from './Prep/EditPlayers';
import StartButton from './Prep/StartButton';

class Prep extends Component {
    render() {
        return (
            <div className="prep">
                <EditPlayers
                    addPlayer={this.props.addPlayer}
                    changePlayerName={this.props.changePlayerName}
                    players={this.props.players}
                />

                <EditOptions
                    changeGroupCount={this.props.changeGroupCount}
                    groupCount={this.props.groups.length}
                />

                <StartButton
                    start={this.props.start}
                />
            </div>
        );
    }
}

Prep.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    start: PropTypes.func.isRequired,
};

export default Prep;
