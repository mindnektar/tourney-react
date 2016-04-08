import React, { Component, PropTypes } from 'react';
import Prep from './Content/Prep';
import Tourney from './Content/Tourney';

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
                        groups={this.props.groups}
                        players={this.props.players}
                        winsPerMatch={this.props.winsPerMatch}
                    />
                }

                {this.props.view === 'preliminaries' &&
                    <Tourney
                        groups={this.props.groups}
                        players={this.props.players}
                        preliminaries={this.props.preliminaries}
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
    changeWinsPerMatch: PropTypes.func.isRequired,
    cutoff: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    preliminaries: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
    winsPerMatch: PropTypes.object.isRequired,
};

export default Content;
