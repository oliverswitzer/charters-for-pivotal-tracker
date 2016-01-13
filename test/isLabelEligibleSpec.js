describe('isLabelEligible', function () {
  describe('approves of', function () {
    it('is a charter charter', function () {
      expect(isLabelEligible('charter')).toEqual(true);
    });

    it('charter with labels after it', function () {
      expect(isLabelEligible('charter, something')).toEqual(true);
    });

    it('charter with labels before it', function () {
      expect(isLabelEligible('a label, charter')).toEqual(true);
    });

  });

  describe('hates', function () {
    it('not actually a charter', function () {
      expect(isLabelEligible('chorter')).toEqual(false);
    });
  });
});
