var styleStoryIcon = function styleStoryIcon(story) {
  var metadata = story.querySelector('header.preview span.meta');

  if(metadata) {
    metadata.classList.add('dev diary');

    var numberOfSubtasks = story.querySelector('task').length;

    if (numberOfSubtasks > 0 && numberOfSubtasks <= 4) {
    }
  }
};