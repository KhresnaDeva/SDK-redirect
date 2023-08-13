function formEncode (payload) {
    var obj = Object.entries(payload)
    .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&");
    //console.log("OBJ ", obj);
    return obj;
}

export const iam = {
    iam_server_url: 'https://api-oss.domain-dev.site',
    client_id: '',
    redirect_uri: '',
    audience: '',
    scope: '',
    client_secret: '',
    setup: function(client_id = '', client_secret = '', redirect_uri = '', audience = '', scope = '') {
        this.client_id = client_id
        this.client_secret = client_secret
        this.redirect_uri = redirect_uri
        this.audience = audience
        this.scope = scope
    },
    redirect: () => {
        let payload = {
            client_id: this.client_id,
            redirect_uri: this.redirect_uri,
            audience: this.audience,
            scope: this.scope
        }
        let redirect_url = this.iam_server_url + '/authorize?' + formEncode(payload)
        return redirect_url
    },
    getAccessToken: async function(authCode = '') {
        let payload = {
            code: authCode,
            grant_type: "authorization_code",
            client_id: this.client_id,
            client_secret: this.client_secret,
            redirect_uri: this.redirect_uri,
        }

        const response = await fetch(`${this.iam_server_url}/oauth/token`, {
            method: 'POST',
            data: formEncode(payload),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const data = response.json()
        return data
    }

}