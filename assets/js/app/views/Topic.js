
var TopicView = Backbone.View.extend({
  template: Handlebars.compile( $("#TopicTmpl").html() || "" ),
  initialize:function(){
    this.render();
    this.delegateEvents();
    return this;
  },
  render:function(){
    this.setElement( this.template( this.model.toJSON() ));
    return this;
  },
  events:{
    'click':"clickHandler"
  },
  clickHandler:function(){
    Backbone.trigger("topic::changed", this.model);
  }
});

module.exports = TopicView;
