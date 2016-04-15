import React, { Component, PropTypes } from 'react';

class ViewOption extends Component {
    onClick() {
        if (this.props.disabled) {
            return;
        }

        this.props.onClick();
    }

    render() {
        return (
            <div
                className={`view-option${(this.props.active ? ' active' : '')}${(this.props.disabled ? ' disabled' : '')}`}
                onClick={() => this.onClick()}
            >
                {this.props.label}
            </div>
        );
    }
}

ViewOption.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

export default ViewOption;
