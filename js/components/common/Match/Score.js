import React, { Component, PropTypes } from 'react';

class Score extends Component {
    render() {
        return (
            <td className="score">
                <span>
                    <input
                        defaultValue={this.props.score}
                        maxLength="2"
                        onBlur={event => this.props.changeScore(event.target.value)}
                        type="text"
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
