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
                    view={this.props.ui.view}
                />

                <Content
                    addPlayer={this.props.addPlayer}
                    changeGroupCount={this.props.changeGroupCount}
                    changePlayerName={this.props.changePlayerName}
                    changeWinsPerMatch={this.props.changeWinsPerMatch}
                    groups={this.props.data.groups}
                    players={this.props.data.players}
                    preliminaries={this.props.data.preliminaries}
                    view={this.props.ui.view}
                    winsPerMatch={this.props.data.winsPerMatch}
                />
            </div>
        );
    }
}

App.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    changeWinsPerMatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.data,
    ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPlayer: actions.addPlayer,
    changeGroupCount: actions.changeGroupCount,
    changePlayerName: actions.changePlayerName,
    changeView: actions.changeView,
    changeWinsPerMatch: actions.changeWinsPerMatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
