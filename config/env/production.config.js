module.exports = {
    name: 'api-proxy',
    debug: true,
    port: 8001,
    workers: 1,
    auth: {
        url: 'https://developers.tradeking.com',
        path: '/internal/authorize.json'
    },
    api_url: 'https://api.tradeking.com'
}