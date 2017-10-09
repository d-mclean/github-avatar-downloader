/* 20171009 DM - LHL w2d1 GitHub Avatar Download Project.

  Scoops up all the GitHub avatars and stashes them locally.

*/
var request = require('request');

var GITHUB_USER = "d-mclean";
var GITHUB_TOKEN = "6b726e7b0a008ab574f3a9d424c27ce25d6dc6b2";


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
});

// request(requestURL, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
// request.headers('User-Agent', 'GitHub Avatar Downloader - Student Project');

//   // Using Try/Catch to handle errors.
//   try {
//     request.get(requestURL)

//             // Set user agent to avoid 403 errors.
//             // .set('User-Agent', 'GitHub Avatar Downloader - Student Project')
//             // .headers('User-Agent', 'GitHub Avatar Downloader - Student Project')

//             .on('error', function(err) {
//               throw err;
//             })

//             .on('response', function (response) {                           // Note 3
//               console.log('Response Status Code: ', response.statusCode);
//               console.log('Response Message: ', response.statusMessage);
//               console.log('Response Content Type: ', response.headers['content-type']);
//               //console.log('\n Downloading ...');
//             })
//             .on('finish', function(body) {
//               console.log(body);
//             })



//   } catch (e) {
//     console.log("Error downloading file - ", e.message);
//   }
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

// function callback(error, response, body) {
//           //do somethings
//           console.log(body)
// }