  var preloadedQuestions = function() {
    this.commonQuestions = ko.observableArray([
        { Question: "RADIO?", Answer: [ {choice:"radio1"},{choice:"radio2"},{choice:"radio3"}], Type: "Radio Button",chosenValue:"" },
        { Question: "DropDown?", Answer: [ {choice:"drop1"},{choice:"drop2"},{choice:"drop3"} ], Type: "Drop Down",chosenValue:"" },
        { Question: "TextArea?", Answer: null, Type: "Open-Ended",chosenValue:"" },
        { Question: "CHECK?", Answer: [ {choice:"check1"},{choice:"check2"},{choice:"check3"} ], Type: "Check Box",chosenValue:""  }
      ]);
  };
