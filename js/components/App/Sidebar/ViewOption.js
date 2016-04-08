import React, { Component, PropTypes } from 'react';

class ViewOption extends Component {
    changeView() {
        if (this.props.disabled) {
            return;
        }

        this.props.changeView(this.props.type);
    }

    render() {
        return (
            <div
                className={`view-option${(this.props.active ? ' active' : '')}${(this.props.disabled ? ' disabled' : '')}`}
                onClick={() => this.changeView()}
            >
                {this.props.label}
            </div>
        );
    }
}

ViewOption.propTypes = {
    active: PropTypes.bool.isRequired,
    changeView: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default ViewOption;
