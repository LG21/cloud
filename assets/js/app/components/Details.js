var 
  DetailsView = require('../views/Details'),
  Details;

/**
  Constructor of Details component.
  @param domeEl {jQuery Object}
  @method init 
  @methid addCompontentToDom
*/

function Details(domEl){
  this.domEl = domEl;
  this.init();
}

/**
  init method is going to initialize  global event handlers, which are responsible for communication between components.
  It's an event driven priciple and helps for decoupling components from each other.
*/
Details.prototype.init = function(){
  Backbone.on("topic::changed", this.addCompontentToDom.bind(this));
  Backbone.trigger("details::initialized");
};

/**
  updates details container with current data.
  @param model { Object } - Backbone model
*/
Details.prototype.addCompontentToDom = function(model){
  this.view = new DetailsView({
    model:model
  });
  this.domEl.html( this.view.el );
};

module.exports = Details;
