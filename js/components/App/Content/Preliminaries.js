import React, { Component, PropTypes } from 'react';
import Groups from './Preliminaries/Groups';
import Matches from './Preliminaries/Matches';

class Tourney extends Component {
    render() {
        return (
            <div className="column-container">
                <Groups
                    groups={this.props.groups}
                    players={this.props.players}
                />

                <Matches
                    changeScore={this.props.changeScore}
                    groups={this.props.groups}
                    matches={this.props.matches}
                />
            </div>
        );
    }
}

Tourney.propTypes = {
    changeScore: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    matches: PropTypes.array.isRequired,
};

export default Tourney;
