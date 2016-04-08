import React, { Component, PropTypes } from 'react';
import NumberInput from 'react-number-input';

class EditOptions extends Component {
    render() {
        return (
            <div className="column">
                <h2>Options</h2>

                <div className="option">
                    <div className="option-key">Number of groups:</div>

                    <div className="option-value">
                        <NumberInput
                            max={Math.max(1, Math.floor(this.props.playerCount / 2))}
                            min={1}
                            onChange={event => this.props.changeGroupCount(event.target.value)}
                            type="number"
                            value={this.props.groupCount}
                        />
                    </div>
                </div>

                <div className="option">
                    <div className="option-key">Cutoff for knock-out:</div>

                    <div className="option-value">
                        <NumberInput
                            max={Math.max(1, Math.ceil(this.props.playerCount / this.props.groupCount) - 1)}
                            min={1}
                            onChange={event => this.props.changeCutoff(event.target.value)}
                            type="number"
                            value={this.props.cutoff}
                        />
                    </div>
                </div>

                <div className="option">
                    <div className="option-key">Number of games to win per match:</div>

                    {this.props.winsPerMatch.map((wins, index) =>
                        <div key={index}>
                            <div className="option-key">{index === 0 ? 'Preliminaries' : `Knock-out round ${index + 1}:`}</div>

                            <div className="option-value">
                                <NumberInput
                                    max={4}
                                    min={1}
                                    onChange={event => this.props.changeWinsPerMatch(index, event.target.value)}
                                    type="number"
                                    value={this.props.winsPerMatch[index]}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

EditOptions.propTypes = {
    changeCutoff: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changeWinsPerMatch: PropTypes.func.isRequired,
    cutoff: PropTypes.number.isRequired,
    groupCount: PropTypes.number.isRequired,
    playerCount: PropTypes.number.isRequired,
    winsPerMatch: PropTypes.array.isRequired,
};

export default EditOptions;
