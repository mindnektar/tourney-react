import React, { Component, PropTypes } from 'react';

class Score extends Component {
    render() {
        return (
            <td className="score">
                <span>
                    <input
                        maxLength="2"
                        type="text"
                        value={this.props.score}
                    />
                </span>
            </td>
        );
    }
}

Score.propTypes = {
    score: PropTypes.number,
};

export default Score;
