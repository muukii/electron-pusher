import * as React from 'react'
import { remote } from 'electron'

import service from '@/model/Service.ts'

export interface MainViewProps {

}

export interface MainViewState {
  p8FilePath: string | null
  bundleIdentifier: string | null
  keyID: string | null
  teamID: string | null
  deviceToken: string | null
  payload: string | null,
  isProduction: boolean
}

enum Environment {
  Production = "Production",
  Development = "Development",
}

export class MainView extends React.Component<MainViewProps, MainViewState> {

  constructor(props: MainViewProps) {
    super(props)

    this.state = {
      p8FilePath: null,
      bundleIdentifier: null,
      keyID: null,
      teamID: null,
      deviceToken: null,
      payload: null,
      isProduction: false
    }
  }

  private openFile = () => {
    const filePaths = remote.dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
      filters: [
        {name: 'Pem File', extensions: ['p8']}
      ]
    })
    this.setState({ p8FilePath : filePaths[0] })
  }

  private onChangeEnvironment = (t: any) => {

    switch (t.target.value as Environment) {
      case Environment.Development:
        this.setState({ isProduction : false })
        break
      case Environment.Production:
        this.setState({ isProduction : true })
        break
    }
  }

  private send = () => {

    if (!this.state.deviceToken) {

      return
    }

    if (!this.state.payload) {

      return
    }

    if (!this.state.p8FilePath) {

      return
    }

    if (!this.state.keyID) {

      return
    }

    if (!this.state.teamID) {

      return
    }

    if (!this.state.bundleIdentifier) {

      return
    }

    service.send(
      this.state.deviceToken,
      this.state.payload,
      this.state.p8FilePath,
      this.state.keyID,
      this.state.teamID,
      this.state.bundleIdentifier,
      this.state.isProduction
    )
  }

  render() {

    return (
    <section className="section">
      <div className="field has-addons">
        <div className="control">
          <input
            className="input [disabled]"
            type="text"
            placeholder="Path for p8 file"
            value={this.state.p8FilePath || ''}
            onChange={ () => {} }
          />
        </div>
        <div className="control">
          <button
            className="button is-info"
            onClick={this.openFile}
          >
            Open
          </button>
        </div>
      </div>
      <div className="field">
        <label className="label">BundleID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="BundleID"
            onChange={ (e) => { this.setState({ bundleIdentifier : e.target.value }) }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">KeyID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="KeyID"
            onChange={ (e) => { this.setState({ keyID : e.target.value }) }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">TeamID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="TeamID"
            onChange={ (e) => { this.setState({ teamID : e.target.value }) }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <div className="select">
            <select defaultValue="development" onChange={this.onChangeEnvironment}>
              <option value={Environment.Development}>{Environment.Development}</option>
              <option value={Environment.Production}>{Environment.Production}</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Target Device Token</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="DeviceToken"
            onChange={ (t) => { this.setState({ deviceToken : t.target.value}) } }
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Payload</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Payload JSON"
            onChange={ (e) => { this.setState({ payload : e.target.value }) }}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-link"
            onClick={this.send}
          >
          Send
          </button>
        </div>
      </div>
    </section>
    )
  }
}