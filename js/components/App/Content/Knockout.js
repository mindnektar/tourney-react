import React, { Component, PropTypes } from 'react';
import Round from './Knockout/Round';

class Knockout extends Component {
    render() {
        return (
            <div className="column-container">
                {this.matches && this.matches.map((match, matchIndex) =>
                    <Round
                        changeScore={(playerIndex, gameIndex, score) => this.props.changeScore('knockout', matchIndex, playerIndex, gameIndex, score)}
                    />
                )}
            </div>
        );
    }
}

Knockout.propTypes = {
    changeScore: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
};

export default Knockout;
