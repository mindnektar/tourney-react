import React, { Component, PropTypes } from 'react';
import Score from './Match/Score';

class Match extends Component {
    render() {
        const rounds = this.props.scores[0].length;

        return (
            <tr>
                <td>{this.props.player1.name}</td>

                {Array.from(new Array(rounds), (_, key) =>
                    <Score key={key} score={this.props.scores[0][key]} />
                )}

                <td className="vs">vs</td>

                {Array.from(new Array(rounds), (_, key) =>
                    <Score key={key} score={this.props.scores[1][key]} />
                )}

                <td>{this.props.player2.name}</td>
            </tr>
        );
    }
}

Match.propTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    scores: PropTypes.array.isRequired,
};

export default Match;
