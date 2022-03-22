const {getReleaseBody,filterCommitsFromContext,getTagFromParamstorePath} = require("./utils")
const {GITHUB_TOKEN} = require("./config")


exports.handler = async(event) => {
  try {
      

    
      console.log(event.queryStringParameters)
      const DNS = event.queryStringParameters && event.queryStringParameters.dns ? event.queryStringParameters.dns : null
      const REPO_NAME = event.queryStringParameters && event.queryStringParameters.repo ? event.queryStringParameters.repo : null
      const PATH = event.queryStringParameters && event.queryStringParameters.path ? event.queryStringParameters.path : null
      const final_res_temp = {};

      if(REPO_NAME && PATH && DNS){
        const TAG_NAME = await getTagFromParamstorePath(PATH)
        console.log("Tag",TAG_NAME)
        const data = await getReleaseBody(REPO_NAME,TAG_NAME,GITHUB_TOKEN)
        const body = data.body
        const commits  = filterCommitsFromContext(body)
  
        final_res_temp.statusId = 1;
        final_res_temp.message = "success";
        final_res_temp.tag = TAG_NAME
        final_res_temp.resbody = commits;
      }else{
        final_res_temp.statusId = 0;
        final_res_temp.message = "repo or tag is missing";
        final_res_temp.resbody = [];
      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Headers':'*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(final_res_temp)
      }
  
    } catch (err) {
  
      var final_res_temp = {};
      final_res_temp.statusId = 0;
      final_res_temp.message = "something went wrong";
      final_res_temp.resbody = null;
      console.log(final_res_temp);
  
      return {
  
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Headers':'*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(final_res_temp)
  
      }
    }
  };
  