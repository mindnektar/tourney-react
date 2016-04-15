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
                    disabled={this.props.playerCount < 2}
                    label="Preliminaries"
                />

                <ViewOption
                    active={this.props.view === 'knockout'}
                    onClick={() => this.props.changeView('knockout')}
                    disabled={this.props.playerCount < 2}
                    label="Knock-out"
                />

                <ViewOption
                    onClick={this.props.saveData}
                    label="Save"
                />
            </div>
        );
    }
}

Sidebar.propTypes = {
    changeView: PropTypes.func.isRequired,
    playerCount: PropTypes.number.isRequired,
    saveData: PropTypes.func.isRequired,
    tourneyStarted: PropTypes.bool.isRequired,
    view: PropTypes.string.isRequired,
};

export default Sidebar;
