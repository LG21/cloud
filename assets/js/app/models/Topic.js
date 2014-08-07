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
