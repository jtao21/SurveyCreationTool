var surveyView = function() {

  this.executeSurvey = ko.observable(true);
  this.endSurvey = ko.observable(false);
  this.questionsVisibility = ko.observable(false);
  this.prevQuestionVisibility = ko.observable(false);
  this.nextQuestionVisibility = ko.observable(false);
  this.completeSurveyVisibility = ko.observable(false);
  this.runSurveyVisibility = ko.observable(true);
  this.errorMsg = ko.observable();
  this.indexCounter = ko.observable(0);
  this.maxIndex = ko.observable();
  this.errorMsg = ko.observable("")
  this.runSurvey = this.runSurvey.bind(this);
  this.prevQuestion = this.prevQuestion.bind(this);
};

ko.utils.extend(surveyView.prototype, {
  isAnswerChosen: function(item) {
    //console.log(item)
    if ($.isEmptyObject(item)) {
      this.errorMsg("*Answer Required*")
      return false;
    } else {
      this.errorMsg("")
      return true;
    }
  },

  nextQuestion: function(item) {

    if (this.isAnswerChosen(item())) {
      this.indexCounter(this.indexCounter() + 1)
      this.indexCounter.publishOn("updateIndexCounter");
      this.prevQuestionVisibility(true);

      if (this.indexCounter() == (this.maxIndex() - 1)) {
        this.nextQuestionVisibility(false);
        this.completeSurveyVisibility(true);
      }
    }
  },

  prevQuestion: function() {
    this.errorMsg("");

    this.nextQuestionVisibility(true);
    this.prevQuestionVisibility(true);
    this.indexCounter(this.indexCounter() - 1)
    this.indexCounter.publishOn("updateIndexCounter");
    if (this.indexCounter() == 0) {
      this.prevQuestionVisibility(false);
    }

  },
  complete: function(item) {
    if (this.isAnswerChosen(item())) {

      this.endSurvey(true);
      $('#myModal').modal('show');
    }
  },
  runSurvey: function(maxIndex) {
    this.maxIndex(maxIndex);
    this.indexCounter(0);
    this.indexCounter.publishOn("updateIndexCounter");
    this.nextQuestionVisibility(true);
    this.completeSurveyVisibility(false);
    this.questionsVisibility(true);
    this.runSurveyVisibility(false)
  },
  backToMain: function(){
    this.questionsVisibility(false);
    this.runSurveyVisibility(true)
  }

});
