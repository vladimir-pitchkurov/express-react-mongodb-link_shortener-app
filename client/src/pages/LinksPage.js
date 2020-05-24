import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchLinks = useCallback(async () => {
        const result = await request('/api/link', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setLinks(result)
    }, [request, token])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
}