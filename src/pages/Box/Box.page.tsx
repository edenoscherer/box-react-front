import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import { RouteComponentProps } from "react-router-dom";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";

import "./styles.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import IBoxModel from "../../models/Box.model";
import api from "../../services/api";
import FileModel from "../../models/File.model";

interface State {
    box: IBoxModel;
}

interface Props extends RouteComponentProps<{ id: string }> {}
/**
 * Página com o conteúdo da Box
 *
 * @author Edeno Luiz Scherer <edenoschereer@gmail.com>
 * @date 2019-07-11
 * @export
 * @class BoxPage
 * @extends {Component<Props, State>}
 */
export default class BoxPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            box: {} as IBoxModel
        };
    }

    async componentDidMount() {
        this.subcribeToNewFile();

        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`);
        console.log(response.data);
        this.setState({ box: response.data });
    }

    handleUpload = (files: File[]) => {
        files.forEach(file => {
            const data = new FormData();
            const box = this.props.match.params.id;

            data.append("file", file);
            api.post(`boxes/${box}/files`, data);
        });
    };

    subcribeToNewFile = () => {
        const box = this.props.match.params.id;

        const io = socket("https://edeno-box.herokuapp.com");

        io.emit("connectRoom", box);

        io.on("file", (data: FileModel) => {
            this.setState({
                box: {
                    ...this.state.box,
                    files: [data, ...this.state.box.files]
                }
            });
        });
    };

    render() {
        return (
            <div id="box-container">
                <header>
                    <Logo />
                    <h1>{this.state.box.title}</h1>
                </header>
                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />

                            <p>Arraste arquivos ou clique aqui.</p>
                        </div>
                    )}
                </Dropzone>
                <ul>
                    {this.state.box.files &&
                        this.state.box.files.map(file => (
                            <li key={file.id} id={file.id}>
                                <a
                                    className="fileInfo"
                                    target="_blanck"
                                    href={file.url}
                                    title={file.title}
                                >
                                    <MdInsertDriveFile
                                        size={24}
                                        color="#a5cfff"
                                    />
                                    <strong>{file.title}</strong>
                                </a>
                                <span>
                                    há{" "}
                                    {distanceInWords(
                                        file.createdAt,
                                        new Date(),
                                        {
                                            locale: pt
                                        }
                                    )}
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}
