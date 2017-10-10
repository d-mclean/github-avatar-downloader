/* 20171009 DM - LHL w2d1 GitHub Avatar Download Project.

  Scoops up all the GitHub avatars and stashes them locally.

  Note: this requires an environment variable be set/exported prior to running.
          i.e. in terminal: export GITHUB_TOKEN=<type in gh token here>

*/
var request = require('request');

var GITHUB_USER = 'd-mclean';
// NOTE TO SELF - REMOVE THIS TOKEN re: environment variable instead?
//var GITHUB_TOKEN = '6b726e7b0a008ab574f3a9d424c27ce25d6dc6b2';
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

// Steps 1 - 6.
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
    // This is "error handling" for now.
    if (!error && response.statusCode == 200) {
        // Callback...
         cb(error, body);
    } else {
      // Let the user know what happened if there's an error.
      console.log('Errors:', err);
      console.log('Result:', result);
    }
  });
};

// Step 7
function downloadImageByURL(url, filePath) {
  var fs = require('fs');
  var avatarsFolder;
  var avatarFileExt;
  var avatarFP;

  // Get rid of the file name so we can create the directory if needed.
  avatarsFolder = filePath.substr(0, filePath.lastIndexOf('/'));

  // Check if avatars folder exists and create if needed.
  if (!fs.existsSync(avatarsFolder)){
    fs.mkdirSync(avatarsFolder);
  }

  try {

    request.get(url)
            .on('error', function (err) {
              throw err;
            })

            .on('response', function (response) {
              // If it's an image, grab the file extension.
              if (response.headers['content-type'].substring(0,5) == 'image'){
                avatarFileExt = response.headers['content-type'].substring(response.headers['content-type'].length - 3)
                avatarFP = filePath + '.' + avatarFileExt;
              }

              console.log('\n Downloading image ' + avatarFP + '...');
            })

            .pipe(fs.createWriteStream(filePath))

            .on('finish', function() {
              console.log(' ... download complete (' + avatarFP + ').');
              // Renaming the file here because I can't get it to save it with the extension.
              fs.rename(filePath, avatarFP);
            })

  } catch (e) {
    console.log('Error downloading file - ', e.message);
  }
}

// Tester (Steps 1 - 6):
getRepoContributors('d-mclean', 'hello-world', function(err, result) {
  var strURL = '';
  var strFilename = '';

  // Parse the json object, looking for and outputting the avatar icons.
  JSON.parse(result, function (key, value) {
    //if (key == 'avatar_url') { return value; } else {return value;}
    if (key == 'avatar_url') {
      strURL = value;
    }
    if (key == 'login') {
      strFilename = value;
    }

    // If we have the URL and filename, then download it.
    if (strURL !== '' && strFilename !== ''){
      downloadImageByURL(strURL, 'avatars/' + strFilename);

      // Re-initialize variables back to the empty string.
      strURL = '';
      strFilename = '';
    }
  })
});

/*
// Tester (Step 7+):
downloadImageByURL('https://avatars1.githubusercontent.com/u/109334?v=4', 'avatars/kvirani');
*/