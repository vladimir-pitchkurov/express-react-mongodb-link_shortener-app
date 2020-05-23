import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                console.log(data);
            } catch (e) {

            }
        }
    }

    useEffect(() => {
        window.M && window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="enter link"
                        id="link"
                        className="yellow-input"
                        onChange={e => setLink(e.target.value)}
                        value={link}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    );
}