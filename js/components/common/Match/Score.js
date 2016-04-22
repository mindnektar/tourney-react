import React, { Component, PropTypes } from 'react';

class Score extends Component {
    render() {
        return (
            <td className="score">
                <span>
                    <input
                        maxLength="2"
                        onBlur={() => this.props.updateMatches()}
                        onChange={event => this.props.changeScore(event.target.value)}
                        type="text"
                        value={this.props.score}
                    />
                </span>
            </td>
        );
    }
}

Score.propTypes = {
    changeScore: PropTypes.func.isRequired,
    score: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    updateMatches: PropTypes.func.isRequired,
};

export default Score;
