(function($) {


  Backbone.sync = function(method, model, sucess, error) {
    sucess();
  }


  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });


  var ItemView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click span.swap': 'swap',
      'click span.delete': 'remove'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      $(this.el).html('<span style="color:black;">' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; // for chainable calls, like .render().el
    },

    unrender: function() {
      $(this.el).remove();
    },

    swap: function() {
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1')
      };
      this.model.set(swapped);
    },

    remove: function() {
      this.model.destroy();
    }
  });

  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click button#add': 'addItem'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem);

      this.counter = 0;
      this.render();
    },


    render: function() {
      $(this.el).append("<button id='add'>Add list item</button>")
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item) {
        appendItem(item)
      }, this);
    },

    addItem: function() {
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter
      });

      this.collection.add(item);
      // $(this.el).append("<li>hello world" + this.counter + "</li>")
    },

    appendItem: function(item) {
      var itemView = new ItemView({
        model: item
      });

      $('ul', this.el).append(itemView.render().el);
    }

  });

  var listView = new ListView();
})(jQuery);
