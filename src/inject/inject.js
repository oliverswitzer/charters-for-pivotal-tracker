chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {

    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(handleMutationEvents);
      });
      // configuration of the observer:
      var config = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      };

      observer.observe(document, config);

      var handleMutationEvents = function handleMutationEvents(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, styleLabelsInNode);
        styleLabelsInNode(mutation.target);
      }

      var styleLabelsInNode = function styleLabelsInNode(node) {
        if (nodeIsElement(node)) {
          styleLabels(findLabelsInNode(node));
        }
      }

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.querySelectorAll !== 'undefined');
      }

      var findLabelsInNode = function findLabelsInNode(node) {
        return node.querySelectorAll('a.label');
      }

      var styleLabels = function styleLabels(labels) {
        Array.prototype.forEach.call(labels, function(label) {
          if (isLabelEligible(label.textContent)) {
            var story = findStory(label);
            if(!story) { return; }
            styleStoryIcon(story);
          }
        });
      }

      function findStory(label) {
        var currentNode = label;

        while(Array.prototype.indexOf.call(currentNode.classList, 'story') === -1) {
          currentNode = currentNode.parentElement;
          if(!currentNode) { return null; }
        }
        return currentNode;
      }

      var getTasks = function getTasks(story) {
        var storyId = getStoryId(story);
        return document.querySelectorAll('.' + storyId + ' section.tasks');
      };

      var getMetadata = function getMetadata(story) {
        return story.querySelector('header.preview span.meta')
      };

      function getStoryId(story) {
        var storyId = Array.prototype.find.call(story.classList, function (classSelector) {
          var matchResult = classSelector.match(/story_\d*/i);
          if (matchResult) {
            return matchResult
          }
        });
        return storyId;
      }

      function styleStoryIcon(story) {
        if(story.querySelector('header.preview span.meta')) {
          var meta = getMetadata(story);
          meta.classList.add('dev-diary');

          var storyTasks = getTasks(story);
          if (storyTasks == null || storyTasks.length >= 0 || storyTasks.length <= 4) {
            meta.classList.add('happy');
          } else if (storyTasks.length >= 5 || storyTasks <= 8) {
            meta.classList.add('meh')
          } else {
            meta.classList.add('sad')
          }
        }
      }
    }
  }, 10);
});
