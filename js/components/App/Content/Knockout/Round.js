import React, { Component, PropTypes } from 'react';

class Round extends Component {
    render() {
        return (
            <div className="column">
                {this.props.matches.map((match, matchIndex) =>
                    (typeof match.bye === 'undefined' &&
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
                                                        onBlur={() => this.props.updateMatches()}
                                                        onChange={event => this.props.changeScore(matchIndex, playerIndex, gameIndex, event.target.value)}
                                                        type="text"
                                                        value={score}
                                                    />
                                                </span>
                                            </td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )
                )}

                {typeof this.props.matches[this.props.matches.length - 1].bye !== 'undefined' &&
                    <table className="bye">
                        <tbody>
                            <tr>
                                <td>{`${this.props.matches[this.props.matches.length - 1].bye.name || 'Someone'} gets a bye`}</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

Round.propTypes = {
    changeScore: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    updateMatches: PropTypes.func.isRequired,
};

export default Round;
