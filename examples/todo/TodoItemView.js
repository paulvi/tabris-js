/* global todo: true, Backbone: false */
/* jshint nonew: false */

todo = window.todo || {};

todo.TodoItemView = Backbone.View.extend({

  events: {
    "selection toggleCheckbox": "toggleDone",
    "longpress toggleCheckbox": "edit",
    "selection clearLabel": "clear"
  },

  initialize: function() {
    this.createWidgets();
    this.listenTo(this.model, "change", this.render)
        .listenTo(this.model, "clear", this.excludeFromLayout)
        .listenTo(this.model, "destroy", this.remove);
  },

  createWidgets: function() {
    this.toggleCheckbox = tabris.create("CheckBox");
    this.clearLabel = tabris.create("Label", {
      backgroundImage: {src: "images/destroy.png", width: 20, height: 20}
    });
    this.widget.append(this.toggleCheckbox, this.clearLabel);
    this.layout();
  },

  layout: function() {
    this.toggleCheckbox.set("layoutData", {left: 20, top: 0, height: 50, right: 44});
    this.clearLabel.set("layoutData", {top: 15, right: 17, width: 20, height: 20});
  },

  render: function() {
    this.toggleCheckbox.set({text: this.model.get("title"), selection: this.model.get("done")});
    var priority = this.model.get("priority");
    this.toggleCheckbox.set("foreground", priority === todo.PRIORITY_LOW ? "#bcbcbc" : "black");
    this.widget.set("background", priority === todo.PRIORITY_HIGH ? "#ffe4d5" : "white");
    return this;
  },

  toggleDone: function() {
    this.model.save("done", this.toggleCheckbox.get("selection"));
  },

  edit: function() {
    new todo.TodoEditView({model: this.model});
  },

  clear: function() {
    this.model.clear();
  },

  excludeFromLayout: function() {
    var nextView = this.parentView.getItemView(this.model.getNext());
    if (nextView) {
      var previousView = this.parentView.getItemView(this.model.getPrevious());
      var top = previousView ? [previousView.widget, 0] : 0;
      nextView.widget.set("layoutData", {left: 0, top: top, right: 0});
    }
  }

});
