import React, { Component, PropTypes } from 'react';
import Match from 'components/common/Match';

class Preliminaries extends Component {
    render() {
        return (
            <div className="column">
                <h2>Preliminaries</h2>

                <table className="preliminaries">
                    <tbody>
                        {this.props.preliminaries.map((preliminary, index) =>
                            <Match
                                key={index}
                                player1={this.props.groups[preliminary.group].players[preliminary.players[0]]}
                                player2={this.props.groups[preliminary.group].players[preliminary.players[1]]}
                                scores={preliminary.scores}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

Preliminaries.propTypes = {
    groups: PropTypes.array.isRequired,
    preliminaries: PropTypes.array.isRequired,
};

export default Preliminaries;
