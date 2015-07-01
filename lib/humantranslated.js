var request = require("request");
var cookieJar = request.jar()
var request = request.defaults({jar:cookieJar})
var _ = require("lodash");

var API   = "http://localhost:3000/api/";

// Build the options object for Authentication requests
var getAuthHeaderOptions = function(username, password) {

  var options = {
    url: API + 'auth/signin',
    // authentication headers
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    'form': {
      'username': username,
      'password': password
    }
  };
  
  return options;

};

module.exports = (function(request) {
  return {
    /**
     * Return all the stories
     * @param {String} username
     * @param {String} password
     * @param {function} cb function(err, result)
     */
    getStories: function(username, password, cb) {
    //getStories: function(KEY, user, cb, sort) {

      sort = ''; //sort || 'most-completed';

      var authOptions = getAuthHeaderOptions(username, password);

      // Login and get cookies
      request.post(authOptions, function(err, res) {

        var options = {
          url: API + 'stories',
          // authentication headers
          jar: cookieJar
        };

        //Check for right status code
        if(res.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', res.statusCode);
        }

        request.get(options, function(err, res){
        //request.get("http://" + API + 'stories' + sort, function(err, res) {
          if(!err) {
            //To add stories list
            //if(res.hasOwnProperty('body')) {
              try {
                var stories= JSON.parse(res.body),
                    i,
                    result = [];

                  // Loop words to build out our words object
                _.each(stories, function(story) {
                  result.push({
                    '_id': story._id,
                    'title': story.title,
                    'content': (!story.content ? 'N/A' : story.content).toString(),
                    'created': story.created,
                    'wordcount': (!story.wordcount ? 0 : story.wordcount).toString(),
                    'user': story.user.displayName
                  });
                });

                cb(null, result);
                
              } catch(e) {
                //cb(true, res);
                cb(e);
              }
            /*} else {
              cb(true, res);
            }*/
          } else {
            cb(err);
          }
        });
      });
    },

    /**
     * @param {Object} userData {username: String, password: SHA1String}
     */
    newStory: function(username, password, story, cb) {

      var authOptions = getAuthHeaderOptions(username, password);
      
      // Login and get cookies
      request.post(authOptions, function(err, res) {

        //Check for right status code
        if(res.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', res.statusCode);
        }

        var options = {
          url: API + 'stories',
          // authentication headers
          'cookieJar': cookieJar,
          json: story
        };
        
        // Post the story here
        request.post(options, function(err, res){
          if(!err) {
            cb(null, true);
          } else {
            cb(true, false);
          }
        });

      });
    },

    /**
     * @param {Object} userData {username: String, password: SHA1String}
     */
    updateStory: function(username, password, story, cb) {

      var authOptions = getAuthHeaderOptions(username, password);
      
      // Login and get cookies
      request.post(authOptions, function(err, res) {

        //Check for right status code
        if(res.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', res.statusCode);
        }

        var options = {
          url: API + 'stories/'+story._id,
          // authentication headers
          'cookieJar': cookieJar,
          json: story
        };
        
        // Put the story here
        request.put(options, function(err, res){
          if(!err) {
            cb(null, true);
          } else {
            cb(true, false);
          }
        });

      });
    },

    /**
     * @param {Object} userData {username: String, password: SHA1String}
     */
    deleteStory: function(username, password, story_id, cb) {

      var authOptions = getAuthHeaderOptions(username, password);
      
      // Login and get cookies
      request.post(authOptions, function(err, res) {

        //Check for right status code
        if(res.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', res.statusCode);
        }

        var options = {
          url: API + 'stories/'+story_id,
          // authentication headers
          'cookieJar': cookieJar
        };
        
        // Delete the story here
        request.del(options, function(err, res){
          if(!err) {
            cb(null, true);
          } else {
            cb(true, false);
          }
        });

      });
    }
  };
}(request));

