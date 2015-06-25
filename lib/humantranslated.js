var request = require('request');
var _ = require("lodash");

module.exports = (function(request) {
  var API   = "localhost:3000/api/";

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
      request.get("http://" + username + ":" + password + "@" + API + 'stories' + sort, function(err, res) {
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
    }

    /**
     * Return all the user's stories
     * @param {String} KEY  KEY of the user
     * @param {String} user Nick of the user
     * @param {function} cb function(err, result)
     */
/*    getStories: function(KEY, user,  cb) {
      request.get(API + 'stories/' + KEY + "/" + user,
                  function(err, res) {
        if(!err) {
          if(res.hasOwnProperty('body')) {
            try {
              var body = JSON.parse(res.body),
                  i, j,
                  result = [];

              for(i in body) {
                if(body[i].hasOwnProperty('stories')) {
                  for(j in body[i].stories) {
                    result.push({
                      '_id': story._id,
                      'title': story.title,
                      'content': (!story.content ? 'N/A' : story.content).toString(),
                      'created': story.created,
                      'wordcount': (!story.wordcount ? 0 : story.wordcount).toString(),
                      'user': story.user.displayName
                    });
                  }
                }
              }
              cb(null, result);
            } catch(e) {
              cb(true, res);
            }
          } else {
            cb(true, res);
          }
        } else {
          cb(true, false);
        }
      });
    },
*/
    /**
     * @param {String} KEY APIKEY
     */
/*    getLabels: function(KEY, label, cb) {
      request.get(API + '/labels/' + KEY + '/' + label,
                  function(err, res) {
        if(!err) {
          if(res.hasOwnProperty('body')) {
            try {
              var body = JSON.parse(res.body),
                  i,
                  result = [];

              for(i in body) {
                result.push({
                  '_id': body[i]._id,
                  'labelLong': body[i].labellong,
                  'labelShort': body[i].labelshort
                });
              }
              cb(null, result);
            } catch(e) {
              cb(true, res);
            }
          } else {
            cb(true, res);
          }
        } else {
          cb(true, false);
        }
      });
    },
*/
    /**
     * @param {String} KEY  API KEY
     * @param {Object} userData {username: String, password: SHA1String}
     */
/*    saveStory: function(KEY, userData, storyData, cb) {
      request.post({
        url: API + 'stories/' + KEY,
        json: {
          'username': userData.username,
          'password': userData.password,
          '_id': story._id,
          'title': story.title,
          'content': (!story.content ? 'N/A' : story.content).toString(),
          'created': story.created,
          'wordcount': (!story.wordcount ? 0 : story.wordcount).toString(),
          'user': story.user.displayName
        }
      }, function(err) {
        if(!err) {
          cb(null, true);
        } else {
          cb(true, false);
        }
      });
    }*/
  };
}(request));

