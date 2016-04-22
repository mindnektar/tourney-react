import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Content from './App/Content';
import Sidebar from './App/Sidebar';

class App extends Component {
    render() {
        return (
            <div>
                <Sidebar
                    changeView={this.props.changeView}
                    saveData={this.props.saveData}
                    tourneyCreated={this.props.data.matches.length > 0}
                    tourneyStarted={this.props.ui.started}
                    view={this.props.ui.view}
                />

                <Content
                    addPlayer={this.props.addPlayer}
                    changeCutoff={this.props.changeCutoff}
                    changeGroupCount={this.props.changeGroupCount}
                    changePlayerName={this.props.changePlayerName}
                    changeScore={this.props.changeScore}
                    changeWinsPerMatch={this.props.changeWinsPerMatch}
                    createTourney={this.props.createTourney}
                    cutoff={this.props.data.cutoff}
                    deletePlayer={this.props.deletePlayer}
                    duration={this.props.data.duration}
                    groups={this.props.data.groups}
                    matches={this.props.data.matches}
                    players={this.props.data.players}
                    updateMatches={this.props.updateMatches}
                    view={this.props.ui.view}
                    winsPerMatch={this.props.data.winsPerMatch}
                />
            </div>
        );
    }
}

App.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeCutoff: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    changeScore: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    changeWinsPerMatch: PropTypes.func.isRequired,
    createTourney: PropTypes.func.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    saveData: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    updateMatches: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    data: state.data,
    ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPlayer: actions.addPlayer,
    changeCutoff: actions.changeCutoff,
    changeGroupCount: actions.changeGroupCount,
    changePlayerName: actions.changePlayerName,
    changeScore: actions.changeScore,
    changeView: actions.changeView,
    changeWinsPerMatch: actions.changeWinsPerMatch,
    createTourney: actions.createTourney,
    deletePlayer: actions.deletePlayer,
    saveData: actions.saveData,
    updateMatches: actions.updateMatches,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
