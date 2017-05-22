$(function() {

  //Cria um model para o serviço
  var Services = Backbone.Model.extend({

    default: {
      title: 'My service',
      price: 100,
      checked: false
    },
    toggle: function() {
      this.set('checked', !this.get('checked'))
    }
  });

  //Criar uma collection para os serviços
  var ServiceList = Backbone.Collection.extend({
    model: Services,
    getChecked: function() {
      return this.where({
        checked: true
      });
    }
  });

  //preenche a collection com os dados do serviço
  var services = new ServiceList([
    new Services({
      title: 'web development',
      price: 200
    }),
    new Services({
      title: 'web design',
      price: 250
    }),
    new Services({
      title: 'photography',
      price: 100
    }),
    new Services({
      title: 'coffe drinking',
      price: 10
    })
  ]);

  //view retorna o Service Model para dentro do HTML, criando li's

  var ServiceView = Backbone.View.extend({
    tagName: 'li',
    events: {
      click: 'toggleService'
    },
    initialize: function() {
      //Configura os event listeners. A alteração é gerada quando uma
      //propriedade muda (como o input checked)

      this.listenTo(this.model, 'change', this.render)
    },

    render: function() {
      //cria o HTML
      this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" />' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
      this.$('input').prop('checked', this.model.get('checked'));

      return this;
    },

    toggleService: function() {
      this.model.toggle();
    }

  });

  //A view principal da aplicação
  var App = Backbone.View.extend({
    el: $('#main'),

    initialize: function() {
      //coloca em cache esses seletores
      this.total = $('#total span');
      this.list = $('#services');

      //Observa todos os eventos de mudança na collection
      //é equivalente a escutar todos os objetos passados
      //para os serviços pela collection

      this.listenTo(services, 'change', this.render);

      //cria views para todos os serviços que estão na collection
      //e adiciona eles na página

      services.each(function(service) {
        var view = new ServiceView({
          model: service
        });
        this.list.append(view.render().el);
      }, this); //this é o contexto do callback
    },
    render: function() {
      //Calcula o total dos preços apenas para elementos checados
      var total = 0;

      _.each(services.getChecked(), function(elem) {
        total += elem.get('price');
      });

      //atualiza o preço total
      this.total.text('$' + total);
      return this;
    }


  });

  new App();


})
