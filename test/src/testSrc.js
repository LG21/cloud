var Topics = require( '../../assets/js/app/collections/Topics' ),
    Details = require( '../../assets/js/app/components/Details' ),
    TopicsCloud = require( '../../assets/js/app/components/TopicsCloud' ),
    Topic = require( '../../assets/js/app/models/Topic' );

  window.srcNamespace = {};
  srcNamespace['Topic'] = Topic;
  srcNamespace['Topics'] = Topics;
  srcNamespace['TopicsCloud'] = TopicsCloud;
  srcNamespace['Details'] = Details;
