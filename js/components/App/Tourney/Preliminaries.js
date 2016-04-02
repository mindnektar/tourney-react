import React, { Component, PropTypes } from 'react';

class Preliminaries extends Component {
    render() {
        return (
            <div className="column">
                <h2>Preliminaries</h2>

                <table className="preliminaries">
                    <tbody>
                        {this.props.preliminaries.map((preliminary, index) =>
                            <tr key={index}>
                                <td>{this.props.groups[preliminary.group].players[preliminary.players[0]].name}</td>

                                {Array.from(new Array(this.props.winsPerMatch * 2 - 1), key =>
                                    <td
                                        className="score"
                                        key={key}
                                    >
                                        <span>
                                            <input type="text" />
                                        </span>
                                    </td>
                                )}

                                <td className="vs">vs</td>

                                {Array.from(new Array(this.props.winsPerMatch * 2 - 1), key =>
                                    <td
                                        className="score"
                                        key={key}
                                    >
                                        <span>
                                            <input type="text" />
                                        </span>
                                    </td>
                                )}

                                <td>{this.props.groups[preliminary.group].players[preliminary.players[1]].name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

Preliminaries.propTypes = {
    groups: PropTypes.array.isRequired,
    winsPerMatch: PropTypes.number.isRequired,
    preliminaries: PropTypes.array.isRequired,
};

export default Preliminaries;
