const rp = require('request-promise');

module.exports = {
    getReleaseBody :async (tag)=>{
        return new Promise(function (resolve,reject){

            var options = {
                uri: `https://api.github.com/repos/prashant9428/semantic/releases/tags/${tag}`,
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'user-agent': 'node.js'
                   // 'Authorization': 'token REDACTED_ROTATED_2026'
                },
                json: true // Automatically parses the JSON string in the response
            };
             
            rp(options)
                .then(function (repos) {
                    //console.log('result', repos);
                    resolve(repos)
                })
                .catch(function (err) {
                    // API call failed...
                    console.log('something went wrong',err)
                    reject(err)
                });

        })

    }
}
