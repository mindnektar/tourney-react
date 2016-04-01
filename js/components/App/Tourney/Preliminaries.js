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
                                <td>{this.props.groups[preliminary[0]].players[preliminary[1]].name}</td>
                                <td className="score">
                                    <span>
                                        <input type="text" />
                                    </span>
                                </td>
                                <td className="vs">vs</td>
                                <td className="score">
                                    <span>
                                        <input type="text" />
                                    </span>
                                </td>
                                <td>{this.props.groups[preliminary[0]].players[preliminary[2]].name}</td>
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
    preliminaries: PropTypes.array.isRequired,
};

export default Preliminaries;
