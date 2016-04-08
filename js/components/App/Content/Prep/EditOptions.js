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

                    <div className="option-key">Preliminaries:</div>

                    <div className="option-value">
                        <NumberInput
                            max={4}
                            min={1}
                            onChange={event => this.props.changeWinsPerMatch('preliminaries', event.target.value)}
                            type="number"
                            value={this.props.winsPerMatch.preliminaries}
                        />
                    </div>

                    <div className="option-key">Quarter finals:</div>

                    <div className="option-value">
                        <NumberInput
                            max={4}
                            min={1}
                            onChange={event => this.props.changeWinsPerMatch('quarterFinals', event.target.value)}
                            type="number"
                            value={this.props.winsPerMatch.quarterFinals}
                        />
                    </div>

                    <div className="option-key">Semi finals:</div>

                    <div className="option-value">
                        <NumberInput
                            max={4}
                            min={1}
                            onChange={event => this.props.changeWinsPerMatch('semiFinals', event.target.value)}
                            type="number"
                            value={this.props.winsPerMatch.semiFinals}
                        />
                    </div>

                    <div className="option-key">Finals:</div>

                    <div className="option-value">
                        <NumberInput
                            max={4}
                            min={1}
                            onChange={event => this.props.changeWinsPerMatch('finals', event.target.value)}
                            type="number"
                            value={this.props.winsPerMatch.finals}
                        />
                    </div>
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
    winsPerMatch: PropTypes.object.isRequired,
};

export default EditOptions;
