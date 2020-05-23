import React from "react";

export const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                           <div className="input-field">
                               <input
                                   type="text"
                                   placeholder="enter your email"
                                   id="email"
                                   name="email"
                                   className="yellow-input"
                               />
                               <label htmlFor="email">Email</label>
                           </div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="enter your password"
                                    id="password"
                                    name="password"
                                    className="yellow-input"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action login_buttons">
                        <button className="btn yellow darken-4">Login</button>
                        <button className="btn grey lighten-1 black-text">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}