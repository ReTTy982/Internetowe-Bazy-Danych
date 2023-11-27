import React, { Component } from "react";

export default class SidebarUserConfig extends Component {

    handleLinkClick = (selectedOption) =>{
        this.props.onSidebarClick(selectedOption);
    }

    render() {
        return (
            <div className="sidebar-container2">
                <div className="sidebar">
                    <a className="sidebar-link">Wyloguj</a>
                    <a className="sidebar-link">Konto</a>
                    <a className="sidebar-link">Zarządzaj użytkownikami</a>
                </div>
            </div>
        );
    }
}