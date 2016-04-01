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
                            max={4}
                            min={1}
                            onChange={event => this.props.changeGroupCount(event.target.value)}
                            type="number"
                            value={this.props.groupCount}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

EditOptions.propTypes = {
    changeGroupCount: PropTypes.func.isRequired,
    groupCount: PropTypes.number.isRequired,
};

export default EditOptions;
