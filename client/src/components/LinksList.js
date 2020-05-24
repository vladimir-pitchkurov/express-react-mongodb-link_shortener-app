import React from "react";
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if (!links.length) {
        return <p>You have enough of links..</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Original</th>
                <th>Shortened</th>
                <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {
                links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open Details</Link>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}