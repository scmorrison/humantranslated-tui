'use strict'

var program = require("commander");
var conf = require('../conf.json');
var colors = require("colors");
var pkg = require("../package.json");
var cli = require("./cli");
var humantranslated = require('./humantranslated');
var layout = require('./layout');
var moment = require('moment');

/*
program.version(pkg.version).option("-m, --messageLoading [messageLoading]", "set messageLoading to be printed.");

program.on("--help", function() {
  console.log("  Examples:");
  console.log("");
  console.log("    $ " + pkg.name + " config");
  console.log("    $ " + pkg.name + " stories list");
  console.log("    $ " + pkg.name + " stories add story.json");
  console.log("    $ " + pkg.name + " stories remove --story-id STOREYID");
  console.log("    $ " + pkg.name + " --messageLoading hello");
});

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
} else {
  try {
    cli.print({
      messageLoading: program.messageLoading
    });
  } catch (_error) {
    console.log("[", "humantranslated".white, "]", _error.toString().red);
  }
}*/


//Check if username, password are set
if(conf.username === "" || conf.password === "" ) {
  console.error("Set your username and password in conf.json");
  process.exit(0);
}

// Global variables
var arrayIndex = 0,
    result = {};

// Append to screen titles and messageLoadings

// Pane: Header
layout.screen.append(layout.paneHeader);
layout.screen.append(layout.logTextarea);
layout.paneHeader.append(layout.title);
layout.paneHeader.append(layout.tabStories);
layout.paneHeader.append(layout.tabLabels);
layout.paneHeader.append(layout.tabContacts);
layout.paneHeader.append(layout.tabPreferences);

// Pane: Stories
layout.screen.append(layout.paneStories);
layout.paneStories.append(layout.titleTitle);
layout.paneStories.append(layout.titleContent);
layout.paneStories.append(layout.titleUser);
layout.paneStories.append(layout.titleWordCount);
layout.paneStories.append(layout.titleCreated);
layout.paneStories.append(layout.messageLoading);
layout.messageLoading.hide();
layout.screen.append(layout.helpView);
layout.helpView.hide();

/**
 * Exit
 */
layout.screen.key(['q', 'C-c'], function() {
  return process.exit(0);
});

/**
 * Display Help Screen
 */
layout.screen.key(['?', 'F12'], function() {
  layout.screen.append(layout.helpView);
  layout.helpView.show();
  layout.helpView.enableDrag();
  if(layout.helpView.visible) {
    layout.helpView.focus();
  }
});

layout.helpView.on('keypress', function(ch, key) {
  if(key.name === "escape" || key.name === "enter") {
    layout.screen.remove(layout.helpView);
    layout.screen.render();
  }
});

/**
 * Refresh Screen on resize
 */
layout.screen.on('resize', function() {
  layout.screen.render();
});

/**
 * Toggle tabs
 */
layout.screen.key(['S-s'], function () {
    layout.paneStories.show();
    layout.tabStories.style.bg = 'yellow';
    layout.tabStories.style.fg = 'black';
    layout.tabLabels.style.bg = 'black';
    layout.tabLabels.style.fg = 'yellow';
    layout.tabContacts.style.bg = 'black';
    layout.tabContacts.style.fg = 'yellow';
    layout.tabPreferences.style.bg = 'black';
    layout.tabPreferences.style.fg = 'yellow';
    layout.screen.render();
});

layout.screen.key(['S-l'], function () {
    layout.paneStories.hide();
    layout.tabStories.style.bg = 'black';
    layout.tabStories.style.fg = 'yellow';
    layout.tabLabels.style.bg = 'yellow';
    layout.tabLabels.style.fg = 'black';
    layout.tabContacts.style.bg = 'black';
    layout.tabContacts.style.fg = 'yellow';
    layout.tabPreferences.style.bg = 'black';
    layout.tabPreferences.style.fg = 'yellow';
    layout.screen.render();
});
 
layout.screen.key(['S-c'], function () {
    layout.paneStories.hide();
    layout.tabStories.style.bg = 'black';
    layout.tabStories.style.fg = 'yellow';
    layout.tabLabels.style.bg = 'black';
    layout.tabLabels.style.fg = 'yellow';
    layout.tabContacts.style.bg = 'yellow';
    layout.tabContacts.style.fg = 'black';
    layout.tabPreferences.style.bg = 'black';
    layout.tabPreferences.style.fg = 'yellow';
    layout.screen.render();
});

layout.screen.key(['S-p'], function () {
    layout.paneStories.hide();
    layout.tabStories.style.bg = 'black';
    layout.tabStories.style.fg = 'yellow';
    layout.tabLabels.style.bg = 'black';
    layout.tabLabels.style.fg = 'yellow';
    layout.tabContacts.style.bg = 'black';
    layout.tabContacts.style.fg = 'yellow';
    layout.tabPreferences.style.bg = 'yellow';
    layout.tabPreferences.style.fg = 'black';
    layout.screen.render();
});

// Hit escape when viewing a story
layout.storyView.on('keypress', function(ch, key) {
  if(key.name === "escape" || key.name === "enter") {
    layout.screen.remove(layout.storyView);
    layout.listTitle.focus();
    layout.screen.render();
  }
});


layout.storyView.on('keypress', function(ch, key) {

});

//If press 'Cancel'
layout.storyEditCancel.on('press', function() {
  layout.screen.remove(layout.storyEditForm);
  layout.listTitle.focus();
  layout.screen.render();
});

//If press 'Save'
layout.storyEditSubmit.on('press', function() {
  // Save story

  humantranslated.saveStory(conf.APIKEY, {
    username: conf.username,
    password: conf.password
  }, {
    story_id: result[arrayIndex]._ID,
    title: result[arrayIndex].title,
    created: result[arrayIndex].created,
    content: result[arrayIndex].content
  }, function(err) {
    if(!err) {
      layout.messageLoading.setContent("{center}Save successful{/center}");
    } else {
      layout.messageLoading.setContent("{center}Save Failed\nQuit and restart{/center}");
    }
    layout.screen.remove(layout.storyEditForm);
    layout.messageLoading.show();
    //Wait 2 seconds and re-init
    setTimeout(function(){ layout.messageLoading.hide(); layout.listTitle.focus(); init(); }, 2000);
    layout.screen.render();
  });
});

/**
 * When Press a key into a list
 */
layout.listTitle.on('keypress', function(ch, key) {
  if(key.name === "down" || key.name === "j") {

    layout.listTitle.down(1);
    layout.listContent.down(1);
    layout.listUser.down(1);
    layout.listWordCount.down(1);
    layout.listCreated.down(1);

    //Put down and decrease the index
    if(arrayIndex < result.length-1) {
      arrayIndex += 1;
    }
  } else if(key.name === "up" || key.name === "k") {

    layout.listTitle.up(1);
    layout.listContent.up(1);
    layout.listUser.up(1);
    layout.listWordCount.up(1);
    layout.listCreated.up(1);

    //Put up and increase the index
    if(arrayIndex > 0) {
      arrayIndex -= 1;
    }
  } else if(key.name === "S") {

    layout.tabStories.focus();

  } else if(key.name === "v" || key.name === "enter") {
      //If we have content 
      if(result.length > 0) {
        layout.storyView.setContent("{yellow-fg}{bold}"+result[arrayIndex].title+"{/bold}{/yellow-fg}\n\n"+result[arrayIndex].content);
        layout.storyView.setValue(result[arrayIndex].title+"\n\n"+result[arrayIndex].content);
        layout.screen.append(layout.storyView);
        layout.storyView.scrollTo(0);
        layout.storyView.focus();
        /**
         * Launch external editor (vim, nano, etc.)
         */
        /*layout.storyView.key(['e'], function () {
          layout.storyView.readEditor(function(data) {
            var newTitle = data.indexOf("\n");
            layout.storyView.setContent("{yellow-fg}{bold}"+newTitle+"{/bold}{/yellow-fg}\n\n"+data);
          });
        })*/
      }
  } else if(key.name === "e") {
    //If we have content
    if(result.length > 0) {
      layout.storyEditTextarea.setValue(result[arrayIndex].title+"\n\n"+result[arrayIndex].content);
      //layout.screen.append(layout.storyEditForm);
      //layout.storyEditTextarea.scrollTo(0);
      //layout.storyEditTextarea.focus();*/

      /**
       * Launch external editor (vim, nano, etc.)
       */
      layout.storyEditTextarea.readEditor(function(err, data) {
        var lines = layout.storyEditTextarea.getValue().split("\n");
        // Make the first line the new title
        var title = lines[0];
        // Remove the first line (title)
        lines.splice(0,1);
        // Rejoin the lines and strip leading and training newlines
        var content = lines.join("\n").replace(/^\s+|\s+$/g, '');
        var story = {
          '_id': result[arrayIndex]._id,
          'title': title,
          'content': content,
          'created': result[arrayIndex].created
        };
        humantranslated.saveStory(conf.username, conf.password, story, function(err, res) {
          if(err) console.log(err);
          initStories();
          //layout.listTitle.focus();
          //layout.screen.render();
        }); 
      });
    }
  }
  layout.screen.render();
});

/*
 * Toggle Stories Tab
 */
var toggleStoriesTab = function() {
  layout.paneStories.toggle(); 
  layout.screen.render();
};

/*
 * Init
 */
var initStories = function() {
  //Clear all lists
  layout.listTitle.clearItems();
  layout.listContent.clearItems();
  layout.listUser.clearItems();
  layout.listWordCount.clearItems();
  layout.listCreated.clearItems();

  layout.messageLoading.show();
  layout.screen.render();

  //Get all the stories
  humantranslated.getStories(conf.username, conf.password, function(err, res) {
    if(!err) {
      result = res;
      var index;
          arrayIndex = 0;

      layout.messageLoading.hide();

      if(result.length > 0) {
        for(index in result) {
          layout.listTitle.add(result[index].title);
          layout.listContent.add(result[index].content.substring(0, 25)+'...');
          layout.listUser.add((result[index].user).toString());
          layout.listWordCount.add((result[index].wordcount).toString());
          layout.listCreated.add(moment(result[index].created).format("DD/MM/YYYY HH:mm:ss"));
        }

      } else {
        layout.listTitle.add("n/a");
        layout.listContent.add("n/a");
        layout.listUser.add("n/a");
        layout.listWordCount.add("n/a");
        layout.listCreated.add("n/a");
      }

      layout.tableTitle.append(layout.listTitle);
      layout.tableContent.append(layout.listContent);
      layout.tableUser.append(layout.listUser);
      layout.tableWordCount.append(layout.listWordCount);
      layout.tableCreated.append(layout.listCreated);
      layout.listTitle.focus();
      layout.screen.render();

    } else {
      console.error(res);
    }
  });
}

//Start
initStories();
