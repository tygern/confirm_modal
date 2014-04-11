describe("confirmModal", function () {
  var $fixture;
  var fixture;
  var $trigger;
  var $modal;
  var $confirm;
  var $cancel;
  var $backdrop;

  beforeEach(function () {
    fixture = "#jasmine-content";
    $fixture = $(fixture);
    $fixture.html(
      "<span data-trigger='identifier'></span>" +
        "<div data-modal='identifier' style='display: none;'>" +
        "  <span data-confirm='identifier'></span>" +
        "  <span data-cancel='identifier'></span>" +
        "</div>"
    );

    $trigger = $fixture.find('[data-trigger=identifier]');
    $modal = $fixture.find('[data-modal=identifier]');
    $confirm = $fixture.find('[data-confirm=identifier]');
    $cancel = $fixture.find('[data-cancel=identifier]');
  });

  describe("initialize", function () {
    it("adds a modal-background to the page", function () {
      new ConfirmModal(fixture, 'identifier');
      $backdrop = $fixture.find('.modal-backdrop');

      expect($backdrop.length).toEqual(1);
    });

    it("does not add a modal-background if one is already there", function () {
      $fixture.append("<div class='modal-backdrop'></div>");
      new ConfirmModal(fixture, 'identifier');
      $backdrop = $fixture.find('.modal-backdrop');

      expect($backdrop.length).toEqual(1);
    });
  });

  describe("opening and closing the modal", function () {
    beforeEach(function () {
      new ConfirmModal(fixture, 'identifier');
      $backdrop = $fixture.find('.modal-backdrop');
      $backdrop.hide();
    });

    it("shows the modal and backdrop when the trigger is clicked", function () {
      $trigger.click();

      expect($modal).toBeVisible();
      expect($backdrop).toBeVisible();
    });

    it("closes the modal and backdrop when the backdrop, confirm or cancel is clicked", function () {
      $trigger.click();
      $confirm.click();

      expect($modal).toBeHidden();
      expect($backdrop).toBeHidden();

      $trigger.click();
      $cancel.click();

      expect($modal).toBeHidden();
      expect($backdrop).toBeHidden();

      $trigger.click();
      $backdrop.click();

      expect($modal).toBeHidden();
      expect($backdrop).toBeHidden();
    });

    it("does not close the modal when the modal is clicked", function () {
      $trigger.click();
      $modal.click();

      expect($modal).toBeVisible();
    });
  });

  describe("callbacks", function () {
    var confirm;
    var cancel;

    beforeEach(function () {
      confirm = jasmine.createSpy('confirm');
      cancel = jasmine.createSpy('cancel');

      new ConfirmModal(fixture, 'identifier', {confirm: confirm, cancel: cancel});
      $backdrop = $fixture.find('.modal-backdrop');
      $backdrop.hide();
    });

    it("calls the confirm callback on confirm", function () {
      $trigger.click();
      $confirm.click();

      expect(confirm).toHaveBeenCalled();
      expect(cancel).not.toHaveBeenCalled();
    });

    it("does not call the confirm callback on cancel", function () {
      $trigger.click();
      $cancel.click();

      expect(confirm).not.toHaveBeenCalled();
      expect(cancel).toHaveBeenCalled();

      $trigger.click();
      $backdrop.click();

      expect(confirm).not.toHaveBeenCalled();
      expect(cancel).toHaveBeenCalled();
    });
  });
});
