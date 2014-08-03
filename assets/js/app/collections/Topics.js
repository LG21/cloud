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
