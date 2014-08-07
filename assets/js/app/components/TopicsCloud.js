
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

/*
  initializes members of TopicsCloud, adds the component to the Dom 
  and sets event handler, whisch is going to listen to the changes triggered by Details component.
*/

TopicsCloud.prototype.init = function(){
  this.collection = new Topics();
  
  this.View = new TopicsView({
    collection: this.collection
  });

  this.addCompontentToDom();
  Backbone.on("details::initialized", this.changeTopic.bind(this));
};

/*
  if the DOM element for the component is defined, show add components view to the DOM
*/

TopicsCloud.prototype.addCompontentToDom = function(){
  if ( this.domEl ){
    this.domEl.html( this.View.el );
  } 
};

/*
  notifies about clicking on one of the topics in cloud. It sends a Backbone model of clicked element as argument.
*/

TopicsCloud.prototype.changeTopic = function(){
  Backbone.trigger("topic::changed", this.collection.models[0]);
};


module.exports = TopicsCloud;