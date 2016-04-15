import React, { Component, PropTypes } from 'react';

class Round extends Component {
    render() {
        return (
            <div className="column">
                {this.props.matches.map((match, matchIndex) =>
                    <table key={matchIndex}>
                        <tbody>
                            {match.players.map((player, playerIndex) =>
                                <tr key={playerIndex}>
                                    <td>{player ? player.name : ''}</td>

                                    {match.scores[playerIndex].map((score, gameIndex) =>
                                        <td
                                            className="score"
                                            key={gameIndex}
                                        >
                                            <span>
                                                <input
                                                    maxLength="2"
                                                    onChange={event => this.props.changeScore(matchIndex, playerIndex, gameIndex, event.target.value)}
                                                    type="text"
                                                    value={this.props.score}
                                                />
                                            </span>
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

Round.propTypes = {
    changeScore: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
};

export default Round;
