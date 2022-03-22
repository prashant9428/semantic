const rp = require('request-promise');
const AWS = require('aws-sdk')

module.exports = {
    getReleaseBody :async (repo,tag,token)=>{
        return new Promise(function (resolve,reject){

            var options = {
                uri: `https://api.github.com/repos/${repo}/releases/tags/${tag}`,
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'user-agent': 'node.js',
                    'Authorization': token
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

    },

    filterCommitsFromContext: (body)=>{
        const searchRegExp = /\(.*\)/g;
        body = body.replace(searchRegExp,"")
        body = body.replace(/\n/g,' ');
        const splitCommit = body.split('*')
        let res = []
        for(let item of splitCommit){
        if(item.includes('###')){
        res = [...res, ...item.split("###")]
        }else{
        res.push(item)
         }
}
        return res
    },
    
     getTagFromParamstorePath: async(path)=>{
         return new Promise(function (resolve,reject){
        const ssmClient = new AWS.SSM({
          apiVersion: '2014-11-06',
          region: 'ap-south-1'
        });

        ssmClient.getParameter({
          Name: path,
          WithDecryption: true,
        }, (err, data) => {
            if(err){
                console.log("error",err)
            }
          if (data?.Parameter) {
            let output = data.Parameter
            resolve(output.Value)
          }
        });

        })

    }
}