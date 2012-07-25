module.exports = {
    name: 'api-proxy',
    debug: true,
    port: 3000,
    workers: 1,
    auth: {
        url: 'http://192.168.13.239',
        path: '/internal/authorize.json'
    },
    api_url: 'http://192.168.13.241:8001'
}