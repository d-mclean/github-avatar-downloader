/* 20171009 DM - LHL w2d1 GitHub Avatar Download Project.

  Scoops up all the GitHub avatars and stashes them locally.

*/
var request = require('request');

var GITHUB_USER = "d-mclean";
// NOTE TO SELF - REMOVE THIS TOKEN re: environment variable instead?
//var GITHUB_TOKEN = "6b726e7b0a008ab574f3a9d424c27ce25d6dc6b2";
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

var jsonResult;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // Tester (remove this later!!)
  console.log(requestURL);

  // Set options - only needed for user-agent for now.
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        //console.log(body)
         cb(body);
    } else {
      //console.log(response)
    }
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {

        //jsonResult = JSON.stringify(JSON.parse(result));
        //console.log(jsonResult);
  console.log("Errors:", err);
  console.log("Result:", result);
});

// function callback(error, response, body) {
//           //do somethings
//           console.log(body)
// }