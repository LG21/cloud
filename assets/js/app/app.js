/**
  The app starts here. All compontents are required and instantiated.
*/

var TopicsCloud = require('./components/TopicsCloud'),
    Details = require('./components/Details');

CloudApp.components = {
  topicsCloud: new TopicsCloud( $("#Cloud") ),
  details: new Details( $("#Details") )
};
