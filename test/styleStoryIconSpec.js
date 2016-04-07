describe('styleStoryIcon', function () {
  var metaDataFakeInstance, storyFake, stubbedTasks;

  describe('when there is an editable metadata tag', function () {
    beforeEach(function () {
      function metaDataFake() {
        var self = this;
        self.classes = [];
        self.classList = {
          add: function (classSelector) {
            self.classes.push(classSelector)
          }
        }
      };

      storyFake = {
        querySelector: function () {}
      };

      stubbedTasks = 1;

      storyFake.querySelector = jasmine.createSpy('querySelector').and.callFake(function (selector) {
        if (selector == 'header.preview span.meta') {
          debugger
          metaDataFakeInstance = new metaDataFake();
          return metaDataFakeInstance;
        } else if (selector == 'task') {
          debugger;

          return stubbedTasks;
        }
      });
    });

    it('styles the story metadata with dev-diary', function () {
      styleStoryIcon(storyFake);
      expect(metaDataFakeInstance.classes).toContain('dev diary');
    });

    describe('when there are between 0 and 4 subtasks', function () {
      beforeEach(function () {
        expect(metaDataFakeInstance.classList.add).toHaveBeenCalledWith('dev diary');
      });

      Array.prototype.forEach.call([0,1,3,4], function (numberOfSubTasks) {
        it('when there are ' + numberOfSubTasks + ', styles the story as happy', function () {
          stubbedTasks = new Array(numberOfSubTasks);
          styleStoryIcon(storyFake);

          expect(classList.classes).toContain('happy');
        });
      });
    });
    describe('when there are between 5 and 8 subtasks', function () {
      Array.prototype.forEach.call([5,6,7,8], function (numberOfSubTasks) {
        it('when there are ' + numberOfSubTasks + ', styles the story as meh', function () {
          stubbedTasks = numberOfSubTasks;
          styleStoryIcon(storyFake);

          expect(classList.classes.toContain('meh'));
        });
      });
    });
    describe('when there are greater than tasks 9', function () {
      Array.prototype.forEach.call([5,6,7,8], function (numberOfSubTasks) {
        //it('when there are ' + numberOfSubTasks + ', styles the story as meh', function () {
        //  stubbedNumberOfTasks = numberOfSubTasks;
        //  styleStoryIcon(storyFake);
        //
        //  expect(metaDataFake.classList.add).toHaveBeenCalledWith('meh')
        //});
      });
    });
  });
});