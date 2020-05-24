import React from "react";

export const LinkCard = ({link}) => {
    return (
        <>
            <h1>Link</h1>
            <p>Shortened:
                <a href={link.to} target="_blank">{link.to}</a>
            </p>
            <p>Source:
                <a href={link.to} target="_blank">{link.from}</a>
            </p>
            <p>Count of clicks: <strong>{link.clicks}</strong></p>
            <p>Create Date<strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}