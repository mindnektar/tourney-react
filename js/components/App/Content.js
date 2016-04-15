import React, { Component, PropTypes } from 'react';
import Knockout from './Content/Knockout';
import Preliminaries from './Content/Preliminaries';
import Prep from './Content/Prep';

class Content extends Component {
    render() {
        return (
            <div className="content">
                {this.props.view === 'options' &&
                    <Prep
                        addPlayer={this.props.addPlayer}
                        changeCutoff={this.props.changeCutoff}
                        changeGroupCount={this.props.changeGroupCount}
                        changePlayerName={this.props.changePlayerName}
                        changeWinsPerMatch={this.props.changeWinsPerMatch}
                        cutoff={this.props.cutoff}
                        deletePlayer={this.props.deletePlayer}
                        groups={this.props.groups}
                        players={this.props.players}
                        winsPerMatch={this.props.winsPerMatch}
                    />
                }

                {this.props.view === 'preliminaries' &&
                    <Preliminaries
                        changeScore={this.props.changeScore}
                        groups={this.props.groups}
                        players={this.props.players}
                        matches={this.props.matches[0]}
                    />
                }

                {this.props.view === 'knockout' &&
                    <Knockout
                        changeScore={this.props.changeScore}
                        rounds={this.props.matches.slice(1)}
                    />
                }
            </div>
        );
    }
}

Content.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    changeCutoff: PropTypes.func.isRequired,
    changeGroupCount: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    changeScore: PropTypes.func.isRequired,
    changeWinsPerMatch: PropTypes.func.isRequired,
    cutoff: PropTypes.number.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    matches: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
    winsPerMatch: PropTypes.array.isRequired,
};

export default Content;
