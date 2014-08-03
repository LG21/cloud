
var  Topics = require('../collections/Topics'),
  TopicsView = require('../views/Topics'),
  TopicsCloud;

/**
  Constructor of TopicsCloud component.
  @param domeEl {jQuery Object}
  @method init 
  @method addCompontentToDom 
  @methid setDefaultDetails
*/

function TopicsCloud(domEl){
  this.domEl = domEl;
  this.init();
}


TopicsCloud.prototype.init = function(){
  this.collection = new Topics();
  
  this.View = new TopicsView({
    collection: this.collection
  });

  this.addCompontentToDom();
  Backbone.on("details::initialized", this.setDefaultDetails.bind(this));
};

TopicsCloud.prototype.addCompontentToDom = function(){
  this.domEl.html( this.View.el );
};

TopicsCloud.prototype.setDefaultDetails = function(){
  Backbone.trigger("topic::changed", this.collection.models[0]);
};


module.exports = TopicsCloud;