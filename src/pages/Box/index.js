import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default class Box extends Component {


  state = {
    box : {}
  }

  async componentDidMount() {
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`)
    console.log(response.data);
    this.setState({ box: response.data })
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>{this.state.box.title}</h1>
        </header>

        <ul>
          { this.state.box.files && this.state.box.files.map(file => ( 

            <li id={file.id}>
              <a className="fileInfo" target="_blanck" href={file.url} title={file.title}>
                <MdInsertDriveFile size={24} color="#a5cfff" />
                <strong>{file.title}</strong>
              </a>
              <span>há{" "}{ distanceInWords(file.createdAt, new Date(), {
                  locale: pt
              })}</span>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}
