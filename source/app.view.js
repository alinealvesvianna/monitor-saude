var {View} = require ('backbone');

module.export = View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html('Hello Backbone');
  }
})
