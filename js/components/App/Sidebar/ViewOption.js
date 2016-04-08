import React, { Component, PropTypes } from 'react';

class ViewOption extends Component {
    render() {
        return (
            <div
                className={`view-option${(this.props.active ? ' active' : '')}`}
                onClick={() => this.props.changeView(this.props.type)}
            >
                {this.props.label}
            </div>
        );
    }
}

ViewOption.propTypes = {
    active: PropTypes.bool.isRequired,
    changeView: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default ViewOption;
