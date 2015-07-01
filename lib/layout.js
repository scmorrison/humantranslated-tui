var blessed = require('blessed'),
    screen = blessed.screen({
      fullUnicode: true,
      autoPadding: true,
      smartCSR: true,
      useBCE: true
    });


/**
 * Header Pane and sub-elements
 */

// Header Pane
var paneHeader = blessed.box({
  left: 0,
  top: 0,
  width: screen.width,
  height: screen.height,
  tags:true,
  style: {
    fg: '#d33682',
    bg: '#002b36',
    border: {
      fg: 'white'
    },
    hover: {
      bg: 'green'
    }
  },
  keys: true
});


// On the table there is a title
var title = blessed.box({
  top: '1%',
  height: '3%',
  width: screen.width,
  align: 'left',
  content: '{#d33682-fg}{bold}HumanTranslated{/bold}{/#d33682-fg} | [n]ew, [v]iew [e]dit [d]elete [s]hare',
  tags: true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  parent: paneHeader,
});

// Tabs under the main title bar
var tabStories = blessed.box({
  top: '4%',
  left: '0',
  height: '4%',
  width: '25%',
  align: 'left',
  content: '[S]tories',
  tags: true,
  style: {
    fg: 'black',
    bg: 'yellow'
  },
  parent: paneHeader,
});

var tabLabels = blessed.box({
  top: '4%',
  left: '25%',
  height: '4%',
  width: '25%',
  align: 'left',
  content: ' [L]abels',
  tags: true,
  style: {
    fg: 'yellow',
    bg: 'black'
  },
  parent: paneHeader,
});

var tabContacts = blessed.box({
  top: '4%',
  left: '50%',
  height: '4%',
  width: '25%',
  align: 'left',
  content: ' [C]ontacts',
  tags: true,
  style: {
    fg: 'yellow',
    bg: 'black'
  },
  parent: paneHeader,
});

var tabPreferences = blessed.box({
  top: '4%',
  left: '75%',
  height: '4%',
  width: '25%',
  align: 'left',
  content: ' [P]references',
  tags: true,
  style: {
    fg: 'yellow',
    bg: 'black'
  },
  parent: paneHeader,
});

/*
 * Stories Pane and sub-elements
 */

//  Stories Pane
var paneStories = blessed.box({
  left: 0,
  top: '6%',
  width: screen.width,
  height: screen.height,
  tags:true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  keys: true
});

var logTextarea = blessed.textarea({
  parent: paneStories,
  top: '75%',
  left: '75%',
  width: '300', 
  height: '300',
  border: {
    type: 'line',
    fg: 'green'
  },
  tags: true,
  scrollable: true,
  alwaysScroll: true,
  inputOnFocus: false,
  scrollbars: true,
  keys: true,
  vi: true,
  mouse: true
});

var titleTitle = blessed.box({
  left: 0,
  top: '1%',
  height: '4%',
  width: '25%',
  content: '{#d33682-fg}Title{/#d33682-fg}',
  align: 'left',
  tags: true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  parent: paneStories
});

// TitleTable
var tableTitle = blessed.box({
  left: 0,
  top: '1%',
  width: '25%',
  height: screen.height,
  tags: true,
  parent: paneStories
});

// List on the titleTable
var listTitle = blessed.list({
  selectedFg: '#d33682',
  selectedBg: '#002b36',
  parent: tableTitle,
  top: '4%',
  left: 0,
  tags: true
});

var titleContent = blessed.box({
  left: '24%',
  top: '1%',
  height: '4%',
  width: '41%',
  content: '{#d33682-fg}Content{/#d33682-fg}',
  align: 'left',
  tags: true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  parent: paneStories
});

// Content exerpt
var tableContent = blessed.box({
  left: '24%',
  top: '1%',
  width: '41%',
  height: screen.height,
  tags: true,
  parent: paneStories
});

// List story content
var listContent = blessed.list({
  selectedFg: '#d33682',
  selectedBg: '#002b36',
  parent: tableContent,
  top: '4%',
  left: 0,
  tags: true
});

var titleUser = blessed.box({
  left: '64%',
  top: '1%',
  width: '5%',
  height: '4%',
  content: '{#d33682-fg}User{/#d33682-fg}',
  align: 'left',
  tags: true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  parent: paneStories
});

// tableUser
var tableUser = blessed.box({
  left: '64%',
  top: '1%',
  width: '6%',
  height: screen.height,
  tags: true,
  parent: paneStories
});

// List user 
var listUser = blessed.list({
  selectedFg: '#d33682',
  selectedBg: '#002b36',
  parent: tableUser,
  top: '4%',
  left: 0,
  tags: true
});

var titleWordCount = blessed.box({
  left: '69%',
  top: '1%',
  width: '5%',
  height: '4%',
  content: '{#d33682-fg}Words{/#d33682-fg}',
  align: 'left',
  tags: true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  parent: paneStories
});

var tableWordCount = blessed.box({
  left: '69%',
  top: '1%',
  width: '5%',
  height: screen.height,
  tags: true,
  parent: paneStories
});

var listWordCount = blessed.list({
  selectedFg: '#d33682',
  selectedBg: '#002b36',
  parent: tableWordCount,
  top: '4%',
  left: 0,
  tags: true
});

var titleCreated = blessed.box({
  left: '73%',
  top: '1%',
  width: '29%',
  height: '4%',
  content: '{#d33682-fg}Created{/#d33682-fg}',
  align: 'left',
  tags: true,
  style: {
    fg: '#d33682',
    bg: '#002b36'
  },
  parent: paneStories
});

var tableCreated = blessed.box({
  left: '73%',
  top: '1%',
  width: '29%',
  height: screen.height,
  tags: true,
  parent: paneStories
});

var listCreated = blessed.list({
  selectedFg: '#d33682',
  selectedBg: '#002b36',
  parent: tableCreated,
  top: '4%',
  left: 0,
  tags: true
});

// Initial Message
var messageLoading = blessed.box({
  parent: paneStories,
  width: '50%',
  height: 3,
  border: {
    type: 'line'
  },
  tags: true,
  top: 'center',
  left: 'center',
  content: "{center}Fetching data from the web, please wait...{/center}"
});

// Saving Message
var messageSaving = blessed.box({
  parent: paneStories,
  width: '50%',
  height: 3,
  border: {
    type: 'line'
  },
  tags: true,
  top: 'center',
  left: 'center',
  content: "{center}Saving data to server, please wait...{/center}"
});

// Help box
var helpView = blessed.box({
  label: "Help [ESC to close]",
  parent: screen,
  width: '25%',
  height: '50%',
  style: {
    fg: 'white',
  },
  border: {
    type: 'line',
    fg: 'yellow'
  },
  tags: true,
  top: 'center',
  left: 'center',
  scrollable: true,
  alwaysScroll: true,
  scrollbars: true,
  keys: true,
  vi: true,
  content: "GLOBAL\nESC = Close pane\nn = New\ne = Edit\nd = Delete\ns = Share\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences\n\nTABS\nS = Stories\nL = Labels\nC = Contacts\nP = Preferences"
});

var storyView = blessed.textarea({
  parent: screen,
  width: '90%',
  height: '90%',
  border: {
    type: 'line',
    scrollbar: {
      bg: 'red',
      fg: 'blue'
    }
  },
  tags: true,
  top: 'center',
  left: 'center',
  scrollable:  {
    ch: ' '
  },
  alwaysScroll: true,
  scrollbars: true,
  keys: true,
  inputOnFocus: false,
  vi: false
});

// Action confirmation prompt
var confirmPrompt = blessed.question({
  parent: screen,
  top: 'center',
  left: 'center',
  width: 'shrink',
  height: 'shrink',
  keys: true,
  mouse: true,
  tags: true,
  label: ' {yellow-fg}y=OK c=Cancel{/yellow-fg}',
  border: 'line',
  hidden: true,
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    }
  }
});

confirmPrompt._.okay.style = {
  bg: 'black',
  fg: 'green',
  hoverBg: 'blue'
};

confirmPrompt._.okay.autoFocus = false;
confirmPrompt._.okay.hoverText = "Click to confirm";

confirmPrompt._.cancel.style = {
  bg: 'black',
  fg: 'yellow',
  hoverBg: 'blue'
};
confirmPrompt._.cancel.autoFocus = true;
confirmPrompt._.cancel.hoverText = "Click to cancel";

/*
confirmPrompt._.okay.options = {
  parent: confirmPrompt,
  top: 3,
  height: 1,
  left: 2,
  width: 6,
  content: 'Okay',
  align: 'center',
  bg: 'black',
  fg: 'green',
  hoverBg: 'blue',
  autoFocus: false,
  mouse: true,
  hoverText: "Click to confirm"
};

confirmPrompt._.cancel.properties = {
  parent: confirmPrompt,
  top: 3,
  height: 1,
  shrink: true,
  left: 10,
  width: 8,
  content: 'Cancel',
  align: 'center',
  bg: 'black',
  fg: 'yellow',
  hoverBg: 'blue',
  autoFocus: false,
  mouse: true,
  hoverText: "Click to cancel"
};
*/
/*
var storyEditForm = blessed.form({
  parent: screen,
  hidden: true,
  input: false,
  keys: false,
  vi: false,
  mouse: false,
  inputOnFocus: false,
});

var storyEditTextarea = blessed.textarea({
  parent: screen,
  inputOnFocus: false,
  hidden: true,
  input: false,
  keys: false,
  vi: false,
  mouse: false
});

var storyEditSubmit = blessed.button({
  parent: storyEditForm,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: storyEditTextarea.width-25,
  width: 9,
  top: '95%',
  tags: true,
  name: 'yes',
  content: 'Save',
  style: {
    focus: {
      bg: '#002b36',
      fg: '#d33682'
    },
    hover: {
      bg: '#002b36',
      fg: '#d33682'
    }
  },
  border: {
    type: 'line'
  }
});

var storyEditCancel = blessed.button({
  parent: storyEditForm,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: storyEditTextarea.width-15,
  width: 13,
  top: '95%',
  name: 'no',
  tags: true,
  content: 'Cancel',
  style: {
    focus: {
      bg: '#002b36',
      fg: '#d33682'
    },
    hover: {
      bg: '#002b36',
      fg: '#d33682'
    }
  },
  border: {
    type: 'line'
  }
});

var createQuestion = function() {
  var question = createQuestion.question;
 
  if (question) {
    question.detach();
    screen.append(question);
    return question;
  }
 
  question = createQuestion.question = blessed.box({
    parent: screen,
    hidden: true,
    content: '',
    width: 'half',
    height: 5,
    left: 'center',
    top: 'center',
    border: {
      type: 'ascii'
    },
    tags: true
  });
 
  question._.okay = blessed.button({
    parent: question,
    top: 3,
    height: 1,
    left: 2,
    width: 6,
    content: 'Okay',
    align: 'center',
    bg: 'black',
    hoverBg: 'blue',
    autoFocus: false,
    mouse: true
  });
 
  question._.cancel = blessed.button({
    parent: question,
    top: 3,
    height: 1,
    shrink: true,
    left: 10,
    width: 8,
    content: 'Cancel',
    align: 'center',
    bg: 'black',
    hoverBg: 'blue',
    autoFocus: false,
    mouse: true
  });
 
  question._.ask = function(text, callback) {
    var press, okay, cancel;
 
    question.show();
    question.setContent(' ' + text);
 
    screen.on('keypress', press = function(ch, key) {
      if (key.name === 'mouse') return;
      if (key.name !== 'enter'
          && key.name !== 'escape'
          && key.name !== 'q'
          && key.name !== 'y'
          && key.name !== 'n') {
        return;
      }
      done(null, key.name === 'enter' || key.name === 'y');
    });
 
    question._.okay.on('press', okay = function() {
      done(null, true);
    });
 
    question._.cancel.on('press', cancel = function() {
      done(null, false);
    });
 
    screen.saveFocus();
    question.focus();
 
    function done(err, data) {
      question.hide();
      screen.restoreFocus();
      screen.removeListener('keypress', press);
      question._.okay.removeListener('press', okay);
      question._.cancel.removeListener('press', cancel);
      return callback(err, data);
    }
 
    screen.render();
  };
 
  return question;
}*/

// Export all the boxes
exports.logTextarea         = logTextarea;
exports.paneHeader          = paneHeader;
exports.paneStories         = paneStories;
exports.tableTitle          = tableTitle;
exports.tabStories          = tabStories;
exports.tabLabels           = tabLabels;
exports.tabContacts         = tabContacts;
exports.tabPreferences      = tabPreferences;
exports.titleTitle          = titleTitle;
exports.titleContent        = titleContent;
exports.titleUser           = titleUser;
exports.titleWordCount      = titleWordCount;
exports.titleCreated        = titleCreated;
exports.tableContent        = tableContent;
exports.tableUser           = tableUser;
exports.tableWordCount      = tableWordCount;
exports.tableCreated        = tableCreated;
exports.title               = title;
exports.listTitle           = listTitle;
exports.listContent         = listContent;
exports.listUser            = listUser;
exports.listWordCount       = listWordCount;
exports.listCreated         = listCreated;
exports.storyView           = storyView;
//exports.storyEditForm       = storyEditForm;
//exports.storyEditTextarea   = storyEditTextarea;
//exports.storyEditSubmit     = storyEditSubmit;
//exports.storyEditCancel     = storyEditCancel;
exports.messageLoading      = messageLoading;
exports.messageSaving       = messageSaving;
exports.confirmPrompt       = confirmPrompt;
exports.helpView            = helpView;
//exports.createQuestion      = createQuestion;
exports.screen              = screen;
