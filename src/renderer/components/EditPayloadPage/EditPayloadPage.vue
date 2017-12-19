<template>
  
  <section class="section">
    <div class="field has-addons">
      <div class="control">
        <input class="input [disabled]" type="text" placeholder="Path for p8 file" :value=p8FilePath>
      </div>
      <div class="control">
        <a class="button is-info" @click="open()">
          Open
        </a>
      </div>
    </div>
    <div class="field">
      <label class="label">BundleID</label>
      <div class="control">
        <input class="input" type="text" placeholder="BundleID" v-model=topic>
      </div>
    </div>
    <div class="field">
      <label class="label">KeyID</label>
      <div class="control">
        <input class="input" type="text" placeholder="KeyID" v-model=keyID>
      </div>
    </div>
    <div class="field">
      <label class="label">TeamID</label>
      <div class="control">
        <input class="input" type="text" placeholder="DeviceToken" v-model=teamID>
      </div>
    </div>
    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <div class="select">
          <select v-model="type" @input="didSelectType">
            <option value="development">Development</option>
            <option value="production">Production</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Target Device Token</label>
      <div class="control">
        <input class="input" type="text" placeholder="DeviceToken" v-model=deviceToken>
      </div>
    </div>
    <div class="field">
      <label class="label">Payload</label>
      <div class="control">
        <textarea class="textarea" placeholder="Payload JSON" v-model=payload></textarea>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="send">Send</button>
      </div>
    </div>
  </section>
</template>

<script>

import { remote } from 'electron'
import apn from '../../../apns.js'
const dialog = remote.dialog

export default {
  name: "edit-payload-page",
  data() {
    return {
      p8FilePath : null,
      type : "development",
      deviceToken : null,
      payload : null,
      keyID: null,
      teamID: null,
      topic: null
    }
  },
  methods: {
    open() {
      const filePaths = dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
        filters: [
          {name: 'Pem File', extensions: ['p8']}
        ]
      })
      this.p8FilePath = filePaths[0]
    },
    didSelectType(a) {
      console.log("didSelect", a);
    },
    didChangeDeviceToken(value) {
      this.deviceToken = vlaue
    },
    didChangePayload(value) {
      this.payload = value
    },
    send() {
      apn.send(
        this.deviceToken,
        JSON.parse(this.payload),
        this.p8FilePath,
        this.keyID,
        this.teamID,
        this.topic,
        false
        )
    }
  }
}

</script>

<style>

</style>
