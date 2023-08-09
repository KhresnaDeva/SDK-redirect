function formEncode (payload) {
    var obj = Object.entries(payload)
    .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&");
    console.log("OBJ ", obj);
    return obj;
}

exports.iam = {
    iam_server_url: 'https://api-oss.domain-dev.site/',
    client_id: '',
    redirect_uri: '',
    audience: '',
    scope: '',
    setip(client_id, redirect_uri, audience, scope){
        this.client_id = client_id
        this.redirect_uri = redirect_uri
        this.audience = audience
        this.scope = scope
    },
    redirect(){
        let payload = {
            client_id: this.client_id,
            redirect_uri: this.redirect_uri,
            audience: this.audience,
            scope: this.scope
        }
        let redirect_url = this.iam_server_url + 'authorize?' + formEncode(payload)
        return redirect_url
    }
}