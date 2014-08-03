var TopicView = require('../views/Topic');

var TopicsView = Backbone.View.extend({
  initialize:function(options){
    this.childView = TopicView;

    this.render();
  },
  render:function(){
    var _this = this,
        container = document.createDocumentFragment();

    _.each(this.collection.models, function(model){
      var childView = new TopicView({
        model:model 
      });
      
      container.appendChild( childView.el  );
    });
    
    _this.$el.html( container );
    
  },
  clickHandler:function(){
    alert("dasdas");
  }
});

module.exports = TopicsView;
