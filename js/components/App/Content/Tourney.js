import React, { Component, PropTypes } from 'react';
import Groups from './Tourney/Groups';
import Preliminaries from './Tourney/Preliminaries';

class Tourney extends Component {
    render() {
        return (
            <div className="column-container">
                <Groups
                    groups={this.props.groups}
                    players={this.props.players}
                />

                <Preliminaries
                    groups={this.props.groups}
                    preliminaries={this.props.preliminaries}
                />
            </div>
        );
    }
}

Tourney.propTypes = {
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    preliminaries: PropTypes.array.isRequired,
};

export default Tourney;
