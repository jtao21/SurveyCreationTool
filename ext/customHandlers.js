ko.bindingHandlers.visibleAndSelect = {
  //control visibility, give element focus, and select the contents (in order)
  update: function(element, valueAccessor) {
    ko.bindingHandlers.visible.update(element, valueAccessor);
    if (valueAccessor()) {
      setTimeout(function() {
        $(element).find("input").focus().select();
      }, 0); //new tasks are not in DOM yet
    }
  }
};

ko.bindingHandlers.fadeVisible = {
  init: function(element, valueAccessor) {
    // Initially set the element to be instantly visible/hidden depending on the value
    var value = valueAccessor();
    $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
  },
  update: function(element, valueAccessor) {
    // Whenever the value subsequently changes, slowly fade the element in or out
    var value = valueAccessor();
    ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
  }
};
