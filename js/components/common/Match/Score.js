import React, { Component, PropTypes } from 'react';

class Score extends Component {
    render() {
        return (
            <td className="score">
                <span>
                    <input
                        maxLength="2"
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
    score: PropTypes.number,
};

export default Score;
