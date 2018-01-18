import apn, { ProviderOptions } from 'apn'

export default {
  async send(
    deviceToken: string,
    payload: string,
    p8FilePath: string,
    keyID: string,
    teamID: string,
    topic: string,
    isProduction: boolean
  ) {

    const options: ProviderOptions = {
      token: {
        key: p8FilePath,
        keyId: keyID,
        teamId: teamID
      },
      // proxy: {
      //   host: "192.168.10.92",
      //   port: 8080
      // }
      production: isProduction
    };

    console.log("Send", deviceToken, "options", options);

    const apnProvider = new apn.Provider(options)

    const notification = new apn.Notification()

    notification.rawPayload = payload
    notification.topic = topic

    console.log(notification);

    const r = await apnProvider.send(notification, deviceToken)
    console.log(r)
  }
}
