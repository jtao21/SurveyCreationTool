var Task = function (data) {
	this.Question = ko.observable().extend({ required: true });
	this.Answer = ko.observableArray([]).extend({ required: true });
	this.Type = ko.observable().extend({ required: true });
	this.chosenValue = ko.observableArray([]);
	this.updateData(data);
}

//can pass fresh data to this function at anytime to apply updates or revert to a prior version
Task.prototype.updateData = function(data) {
	this.Question(data.Question || "new item");
	this.Answer(data.Answer || 0);
	this.Type(data.Type || 0);
};

var main = function () {
	this.surveyView =  new surveyView();
	this.preloadedQuestions =  new preloadedQuestions();
	var commonQuestions = this.preloadedQuestions.commonQuestions()

	self.errors = ko.validation.group(this, {
            deep        : true,
						live				: false,
            observable  : false
        });

	this.singleQuestion= ko.observable();
	this.indexCounter= ko.observable(0);
	var choices = [
		{ id: 1, name: "Radio Button" },
		{ id: 2, name: "Check Box" },
		{ id: 3, name: "Drop Down" },
		{ id: 4, name: "Open-Ended" }
	];

	this.typeChoices = ko.observableArray(choices);
	//Start Survey with preloaded Questions
	this.qArray = ko.observableArray(
		ko.utils.arrayMap(commonQuestions,
		function(data) {
			return new Task(data);
		})
	);

	//Sets first Question to first item in array
this.singleQuestion(this.qArray()[0]);

this.selectedTask = ko.observable();
this.whichTemplate = ko.observable(null);
//hold the currently selected item
this.selectedItem = ko.observable();
//make edits to a copy
this.itemForEditing = ko.observable();
//Action Buttons
this.selectItem = this.selectItem.bind(this);
this.acceptItem = this.acceptItem.bind(this);
this.addNewAnswer = this.addNewAnswer.bind(this);
this.revertItem = this.revertItem.bind(this);
this.deleteNewAnswer = this.deleteNewAnswer.bind(this);

this.clearTask = function(data, event) {
  if (data === this.selectedTask()) {
    this.selectedTask(null);
  }

  if (data.Question) {
    this.qArray.remove(data);
  }
}.bind(this);

this.isTaskSelected = function(task) {
  return task === this.selectedTask();
}.bind(this);

this.addTask = function() {
  var task = {
    Question: "new",
    Answer: [{
      choice: null
    }],
    Type: null
  }

  this.selectedTask(task);
  this.qArray.push(new Task(task));
  var index = this.qArray().length - 1
  this.selectItem(this.qArray()[index])
};

this.trash = ko.observableArray([]);
this.trash.id = "trash";

ko.postbox.subscribe("updateIndexCounter", function(index) {
  this.singleQuestion(this.qArray()[index]);
}, this);
};

ko.utils.extend(main.prototype, {
  //select an item and make a copy of it for editing
  selectItem: function(item) {
    this.selectedItem(item);
    this.itemForEditing(new Task(ko.toJS(item)));
  },
  addNewAnswer: function(item) {
    this.itemForEditing().Answer.push({
      choice: ""
    })
  },
  deleteNewAnswer: function(item) {
    this.itemForEditing().Answer.pop()
  },
  acceptItem: function(item) {
    if (self.errors().length > 0) {
    } else {
      var selected = this.selectedItem(),
        edited = ko.toJS(this.itemForEditing()); //clean copy of edited
      //apply updates from the edited item to the selected item
      selected.updateData(edited);
      //clear selected item
      this.selectedItem(null);
      this.itemForEditing(null);
    }
  },
  revertItem: function() { //just throw away the edited item and clear the selected observables
    if (self.errors().length > 0) {
    } else {
      this.selectedItem(null);
      this.itemForEditing(null);
    }
  },
});
ko.applyBindings(new main())
