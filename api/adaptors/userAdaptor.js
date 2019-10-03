const nconf = require('nconf');
const joinUrl = require('url-join');
const {getRequest} = require('../utils/httpClient');
const accountAPI = nconf.get('url.userapi');
const url = joinUrl(accountAPI,'accounts', '?page=${page}');
const getAccounts = ({page = 1}) => getRequest({
    url: url
});

module.exports = {
    getAccounts
}