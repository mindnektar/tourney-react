import React, { Component, PropTypes } from 'react';
import ViewOption from './Sidebar/ViewOption';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <ViewOption
                    active={this.props.view === 'options'}
                    changeView={this.props.changeView}
                    disabled={this.props.tourneyStarted}
                    label="Options"
                    type="options"
                />

                <ViewOption
                    active={this.props.view === 'preliminaries'}
                    changeView={this.props.changeView}
                    label="Preliminaries"
                    type="preliminaries"
                />

                <ViewOption
                    active={this.props.view === 'knockout'}
                    changeView={this.props.changeView}
                    label="Knock-out"
                    type="knockout"
                />
            </div>
        );
    }
}

Sidebar.propTypes = {
    changeView: PropTypes.func.isRequired,
    tourneyStarted: PropTypes.bool.isRequired,
    view: PropTypes.string.isRequired,
};

export default Sidebar;
