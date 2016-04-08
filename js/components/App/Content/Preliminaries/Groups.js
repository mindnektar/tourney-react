import React, { Component, PropTypes } from 'react';

class Groups extends Component {
    sortPlayersByRanking(a, b) {
        if (a.ranking < b.ranking) {
            return -1;
        }

        if (a.ranking > b.ranking) {
            return 1;
        }

        return 0;
    }

    render() {
        return (
            <div className="column">
                <h2>Groups</h2>

                {this.props.groups.map((group, groupIndex) =>
                    <table
                        className="rankings"
                        key={groupIndex}
                    >
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Wins</th>
                                <th>Score difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.players && group.players.slice(0).sort(this.sortPlayersByRanking).map((player, playerIndex) =>
                                <tr key={playerIndex}>
                                    <td>{player.name}</td>
                                    <td>{player.wins}</td>
                                    <td>{player.diff}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

Groups.propTypes = {
    groups: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
};

export default Groups;
