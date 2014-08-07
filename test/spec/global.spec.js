var Topic = srcNamespace['Topic'],
    Topics = srcNamespace['Topics'],
    TopicsCloud = srcNamespace['TopicsCloud'],
    Details = srcNamespace['Details'],
    CloudApp = {};

  CloudApp.topics = [ 
    {"id":"1751295897__Berlin","label":"Berlin","volume":165,"type":"topic","sentiment":{"negative":3,"neutral":133,"positive":29},"sentimentScore":65,"burst":13,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":22},{"date":"2014-06-04T00:00:00.000+0000","volume":43},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":12},{"date":"2014-06-08T00:00:00.000+0000","volume":11},{"date":"2014-06-03T00:00:00.000+0000","volume":39},{"date":"2014-06-05T00:00:00.000+0000","volume":100}],"pageType":{"blog":17,"facebook":56,"forum":22,"general":5,"image":0,"news":26,"review":1,"twitter":35,"video":3},"queries":[{"id":1751295897,"name":"Berghain","volume":165}]},
    {"id":"1751295897__DJ","label":"DJ","volume":48,"type":"topic","sentiment":{"neutral":46,"positive":2},"sentimentScore":54,"burst":29,"days":[{"date":"2014-06-06T00:00:00.000+0000","volume":4},{"date":"2014-06-04T00:00:00.000+0000","volume":10},{"date":"2014-06-09T00:00:00.000+0000","volume":0},{"date":"2014-06-07T00:00:00.000+0000","volume":11},{"date":"2014-06-08T00:00:00.000+0000","volume":3},{"date":"2014-06-03T00:00:00.000+0000","volume":12},{"date":"2014-06-05T00:00:00.000+0000","volume":8}],"pageType":{"blog":4,"facebook":13,"forum":8,"general":1,"image":0,"news":7,"review":1,"twitter":13,"video":1},"queries":[{"id":1751295897,"name":"Berghain","volume":48}]}
  ];
   
describe("Topic model", function () {
  it("can be instantiated and has default values", function () {
    var model = new Topic();
    expect(model).toBeDefined();
    expect(model.get("type")).toBe("topic");
  });

  it("sets passed out options as attributes", function(){
    var model = new Topic({
      volume:100,
      sentimentScore:50
    });

    expect( model.get("volume") ).toBe(100);
  });
});

describe("Topics collection", function(){

  beforeEach(function(){
    window.topics = new Topics();
  });

  it("can be instantiated", function () {
    expect(topics).toBeDefined();
  });

  it("converts topics array to models", function () {
    expect(_.isArray(topics.models)).toBeTruthy();
    expect(topics.models.length).toEqual(2);
    expect(topics.models[0].get('label')).toBe("Berlin");
  });

  it("sort models descending", function(){
    expect(topics.models[0].get('volume')).toBeGreaterThan(topics.models[1].get('volume'));
  });

  it("computed percentage levels of headers ( h1 - h6 ) correctly", function(){
    expect(topics.levels).toBeDefined();
    expect(_.size(topics.levels)).toEqual(6);
    expect(topics.levels.h1).toEqual( 165 * 0.85 );
    expect(topics.levels.h5).toEqual( 165 * 0.25 );
 
  });

});

describe("Topics cloud component", function(){
  beforeEach(function(){
    window.topicsCloudWrapper = document.createElement('div');
    topicsCloudWrapper.id = "TopicsCloud";
    window.topicsCloud = new TopicsCloud( $(topicsCloudWrapper) );
  });

  it("can be instantiated", function(){
    expect(topicsCloud).toBeDefined() 
  });

  it("has a root DOM element", function(){
    expect(topicsCloud.domEl).toBeDefined();
    expect(topicsCloud.domEl[0].id).toBe("TopicsCloud");
  });

  it("has a topics collection", function(){
    expect(topicsCloud.collection).toBeDefined();
    expect(topicsCloud.collection.models).toBeDefined();
    expect(topicsCloud.collection.models[0].get("label")).toBe("Berlin");
  });

});

describe("Details component", function(){
  beforeEach(function(){
    var detailsWrapper = document.createElement('div');
    detailsWrapper.id = "Details";
    window.details = new Details( $(detailsWrapper) );
  });

  it("can be instantiated", function(){
    expect(details).toBeDefined() 
  });

 it("has a root DOM element", function(){
    expect(details.domEl).toBeDefined();
    expect(details.domEl[0].id).toBe("Details");
  });
});
