import React, { Component, PropTypes } from 'react';

class Groups extends Component {
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
                            {group.players && group.players.map((player, playerIndex) =>
                                <tr key={playerIndex}>
                                    <td><input type="text" value={player.name} /></td>
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
