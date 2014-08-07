(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Topics = require( '../../assets/js/app/collections/Topics' ),
    Details = require( '../../assets/js/app/components/Details' ),
    TopicsCloud = require( '../../assets/js/app/components/TopicsCloud' ),
    Topic = require( '../../assets/js/app/models/Topic' );

  window.srcNamespace = {};
  srcNamespace['Topic'] = Topic;
  srcNamespace['Topics'] = Topics;
  srcNamespace['TopicsCloud'] = TopicsCloud;
  srcNamespace['Details'] = Details;

},{"../../assets/js/app/collections/Topics":2,"../../assets/js/app/components/Details":3,"../../assets/js/app/components/TopicsCloud":4,"../../assets/js/app/models/Topic":5}],2:[function(require,module,exports){
var Topic = require('../models/Topic'),
    Topics;

Topics = Backbone.Collection.extend({
  model: Topic,
  sortOrder: 'asc',
  sortBy: function() {
    var models = _.sortBy(this.models, this.comparator);
    if (this.sortOrder != 'asc') {
      models.reverse();
    }
    return models;
  },
  comparator:'volume',
  initialize:function(){
    if ( CloudApp.topics ){
      this.reset( CloudApp.topics );
    }
    this.sort();
    this.calculateVolumsRange();
    
    this.reset( CloudApp.topics );
  },
  calculateVolumsRange:function(){
    var coll = _.clone(this.models),
        maxVolume,
        base,
        levels;

    maxVolume = coll[0].get('volume');
    base = maxVolume;

    levels = {
      h1: base * 0.85,
      h2: base * 0.70,
      h3: base * 0.55,
      h4: base * 0.40,
      h5: base * 0.25,
      h6: 0
    }

    this.levels = levels;
  }
});

module.exports = Topics;

},{"../models/Topic":5}],3:[function(require,module,exports){
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

},{"../views/Details":6}],4:[function(require,module,exports){

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
},{"../collections/Topics":2,"../views/Topics":8}],5:[function(require,module,exports){
var Topic = Backbone.Model.extend({
  defaults:{
    "id": "0",
    "label": "-",
    "volume": 0,
    "type": "topic",
    "sentiment": {
      "negative": "0",
      "neutral": "0",
      "positive": "0"
    },
    "sentimentScore": 0
  },
  initialize:function(options){
    var level, levels = 0, newLevel, founded = false,
        volume, sentiment, sentimentScore;
      
    if ( options ){
      volume = options.volume
      sentimentScore = options.sentimentScore
    }

    if ( this.collection && this.collection.levels ){
      levels = this.collection.levels;
    }
    
    for ( level in levels ){
      if (levels.hasOwnProperty(level)){
        //console.log( volume, levels[level] );
        if ( volume > levels[level]){
          if (!founded ){
            newLevel = level;
            founded = true;
          }
        }
      }
    }

    if ( sentimentScore ){
      if ( sentimentScore > 60 ){
        this.set("sentimentIndicator","positive");
      }

      if ( sentimentScore < 40 ){
        this.set("sentimentIndicator","negative");
      }
    }

    if ( options && _.size(options.sentiment) < 3 ){
      
      for ( sentiment in this.defaults.sentiment ){

        if ( options.sentiment && !options.sentiment.hasOwnProperty( sentiment )){
          options.sentiment[sentiment] = this.defaults.sentiment[sentiment];
        }

      }
    }

    this.set("level", newLevel);
  }

});

module.exports = Topic;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){

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

},{}],8:[function(require,module,exports){
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

      if ( childView && childView.el ){
        container.appendChild( childView.el  );
      } 
      
    });
    
    _this.$el.html( container );
    
  }
});

module.exports = TopicsView;

},{"../views/Topic":7}]},{},[1]);
