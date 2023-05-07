PROXY_CONFIG = {
    "/azure/*": {
        "target": "https://talenteca-back.azurewebsites.net/api",
        "secure": true,
        "pathRewrite": {
            "^/azure": ""
        },
        "logLevel": "debug",
        "changeOrigin": true,
    },
    "/local/*": {
        "target": "https://localhost:7230/api",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
            "^/local": ""
        },
    },
}

module.exports = PROXY_CONFIG;