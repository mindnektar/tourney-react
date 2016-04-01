import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Prep from './App/Prep';
import Tourney from './App/Tourney';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.ui.prepping &&
                    <Prep
                        addPlayer={this.props.addPlayer}
                        changeGroupCount={this.props.changeGroupCount}
                        changePlayerName={this.props.changePlayerName}
                        changeWinsPerMatch={this.props.changeWinsPerMatch}
                        groups={this.props.data.groups}
                        players={this.props.data.players}
                        start={this.props.start}
                        winsPerMatch={this.props.data.winsPerMatch}
                    />
                }

                {!this.props.ui.prepping &&
                    <Tourney
                        groups={this.props.data.groups}
                        players={this.props.data.players}
                        preliminaries={this.props.data.preliminaries}
                        winsPerMatch={this.props.data.winsPerMatch}
                    />
                }
            </div>
        );
    }
}

App.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    start: PropTypes.func.isRequired,
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
    changeWinsPerMatch: actions.changeWinsPerMatch,
    start: actions.start,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
