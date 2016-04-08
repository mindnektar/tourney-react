import React, { Component, PropTypes } from 'react';
import Match from 'components/common/Match';

class Matches extends Component {
    render() {
        return (
            <div className="column">
                <h2>Preliminaries</h2>

                <table className="preliminaries">
                    <tbody>
                        {this.props.matches.map((match, index) =>
                            <Match
                                changeScore={(playerIndex, gameIndex, score) => this.props.changeScore(0, index, playerIndex, gameIndex, score)}
                                key={index}
                                player1={this.props.groups[match.group].players[match.players[0]]}
                                player2={this.props.groups[match.group].players[match.players[1]]}
                                scores={match.scores}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

Matches.propTypes = {
    changeScore: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    matches: PropTypes.array.isRequired,
};

export default Matches;
