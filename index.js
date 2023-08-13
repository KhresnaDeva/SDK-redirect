function formEncode (payload) {
    var obj = Object.entries(payload)
    .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&");
    //console.log("OBJ ", obj);
    return obj;
}

exports.iam = {
    iam_server_url: 'https://api-oss.domain-dev.site',
    CLIENT_ID: '',
    CLIENT_SECRET: '',
    REDIRECT_URI: '',
    AUDIENCE: '',
    SCOPE: '',
    setup: function(args) {
        this.CLIENT_ID = args.CLIENT_ID
        this.CLIENT_SECRET = args.CLIENT_SECRET
        this.REDIRECT_URI = args.REDIRECT_URI
        this.AUDIENCE = args.AUDIENCE
        this.SCOPE = args.SCOPE
    },
    redirect: () => {
        let payload = {
            CLIENT_ID: this.CLIENT_ID,
            REDIRECT_URI: this.REDIRECT_URI,
            AUDIENCE: this.AUDIENCE,
            SCOPE: this.SCOPE
        }
        let redirect_url = this.iam_server_url + '/authorize?' + formEncode(payload)
        return redirect_url
    },
    getAccessToken: async function(authCode = '') {
        let payload = {
            code: authCode,
            grant_type: "authorization_code",
            CLIENT_ID: this.CLIENT_ID,
            CLIENT_SECRET: this.CLIENT_SECRET,
            REDIRECT_URI: this.REDIRECT_URI,
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