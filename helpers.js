const client = require('https')

function get_commits(repo, user){
  return new Promise((resolve, reject) => {
      var options = {
        hostname: 'api.github.com',
        path: `/repos/${repo.owner}/${repo.name}/commits`,
        method: 'GET',
        headers: {
          'User-Agent': 'request',
          'Authorization': 'Basic ' + Buffer.from(`${user.username}:${user.password}`).toString('base64')
        }
      }
      client.request(options, res => {
        let buffers = []
        res.on('data', (buffer) => buffers.push(buffer))
        res.on('error', reject);
        res.on('end', () => res.statusCode === 200 
          ? resolve(JSON.parse(Buffer.concat(buffers).toString()))
          : reject(Buffer.concat(buffers))
        )
      })
      .on('error', reject)
      .end()
    })
}

function formatDate(date){
  return new Date(date).toLocaleDateString('en-GB',{
    hour12: false,
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

async function showLastCommit(repo, user){
  var commits = await get_commits(repo, user)
  var last_commit = commits[0]
  console.log('Repository: ' + repo.name)
  console.log('\tAuthor: ' + last_commit.commit.author.name)
  console.log("\tMessage: '" + last_commit.commit.message + "'")
  console.log('\tDate: ' + formatDate(last_commit.commit.committer.date) + '\n')
}

exports.showLastCommit = showLastCommit