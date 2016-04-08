import React, { Component, PropTypes } from 'react';
import Round from './Knockout/Round';

class Knockout extends Component {
    render() {
        return (
            <div className="column-container">
                {this.props.rounds && this.props.rounds.map((round, roundIndex) =>
                    <Round
                        changeScore={(matchIndex, playerIndex, gameIndex, score) => this.props.changeScore(roundIndex, matchIndex, playerIndex, gameIndex, score)}
                        key={roundIndex}
                        label={roundIndex === this.props.rounds.length - 1 ? 'Final round' : `Knock-out round ${roundIndex + 1}`}
                        matches={round}
                    />
                )}
            </div>
        );
    }
}

Knockout.propTypes = {
    changeScore: PropTypes.func.isRequired,
    rounds: PropTypes.array.isRequired,
};

export default Knockout;
