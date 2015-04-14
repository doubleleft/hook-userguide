var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'site'), {
  repo: "https://" + process.env.GH_TOKEN + "@github.com/doubleleft/hook-userguide"
}, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Published successfully at: http://doubleleft.github.io/hook-userguide/");
  }
});
