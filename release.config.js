module.exports  = {
    branches: ["master"],
    repositoryUrl:"https://github.com/prashant9428/semantic",
    plugins:[
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/github'
    ]
}