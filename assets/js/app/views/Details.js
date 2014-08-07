var DetailsView = Backbone.View.extend({
  template: Handlebars.compile( $("#DetailsTmpl").html() || "" ),
  initialize:function(){
    this.render();
  },
  render:function(){
    this.$el.append( this.template( this.model.toJSON() ));
    return this;
  }
});

module.exports = DetailsView;
