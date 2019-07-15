import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import "./styles.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import api from "../../services/api";

interface State {
    newBox: string;
}
interface Props extends RouteComponentProps {}
/**
 * Página para cadastro de Box
 *
 * @author Edeno Luiz Scherer <edenoschereer@gmail.com>
 * @date 2019-07-11
 * @export
 * @class MainPage
 * @extends {Component<Props, State>}
 */
export default class MainPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newBox: ""
        };
    }

    /**
     * Envio do formulário
     *
     * @param {React.FormEvent} e - Evento do form
     *
     */
    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("boxes", {
            title: this.state.newBox
        });

        this.props.history.push(`/box/${response.data._id}`);
    };

    /**
     * Alteração no input
     * atualiza a informação do stado
     *
     * @param {React.ChangeEvent} e
     */
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newBox: e.target.value });
    };

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    {/* <img src={logo} alt="BOX" /> */}
                    <Logo />
                    <input
                        placeholder="Criar um box"
                        value={this.state.newBox}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
