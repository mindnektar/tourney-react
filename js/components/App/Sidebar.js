import React, { Component, PropTypes } from 'react';
import ViewOption from './Sidebar/ViewOption';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <ViewOption
                    active={this.props.view === 'options'}
                    onClick={() => this.props.changeView('options')}
                    disabled={this.props.tourneyStarted}
                    label="Options"
                />

                <ViewOption
                    active={this.props.view === 'preliminaries'}
                    onClick={() => this.props.changeView('preliminaries')}
                    disabled={!this.props.tourneyCreated}
                    label="Preliminaries"
                />

                <ViewOption
                    active={this.props.view === 'knockout'}
                    onClick={() => this.props.changeView('knockout')}
                    disabled={!this.props.tourneyCreated}
                    label="Knock-out"
                />
            </div>
        );
    }
}

Sidebar.propTypes = {
    changeView: PropTypes.func.isRequired,
    saveData: PropTypes.func.isRequired,
    tourneyCreated: PropTypes.bool.isRequired,
    tourneyStarted: PropTypes.bool.isRequired,
    view: PropTypes.string.isRequired,
};

export default Sidebar;
