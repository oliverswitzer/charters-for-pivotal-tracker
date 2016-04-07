describe('isLabelEligible', function () {
  describe('approves of', function () {
    it('is a dev diary', function () {
      expect(isLabelEligible('dev diary')).toEqual(true);
    });

    it('dev diary with labels after it', function () {
      expect(isLabelEligible('dev diary, charter, something')).toEqual(true);
    });

    it('dev diary with labels before it', function () {
      expect(isLabelEligible('a label, dev diary')).toEqual(true);
    });
  });

  describe('hates', function () {
    it('not actually a dev diary', function () {
      expect(isLabelEligible('derp diary')).toEqual(false);
    });
  });
});
