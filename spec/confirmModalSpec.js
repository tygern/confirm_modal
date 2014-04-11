describe("confirmModal", function () {
  var $fixture;
  var fixture;
  var $trigger;
  var $modal;
  var $modalContent;
  var $confirm;
  var $cancel;

  beforeEach(function () {
    fixture = "#jasmine-content";
    $fixture = $(fixture);
    $fixture.html(
      "<span data-trigger='identifier'></span>" +
        "<div data-modal='identifier' style='display: none;'>" +
        "<div class='modal-content'>" +
        "  <span data-confirm='identifier'></span>" +
        "  <span data-cancel='identifier'></span>" +
        "</div>" +
        "</div>"
    );

    $trigger = $fixture.find('[data-trigger=identifier]');
    $modal = $fixture.find('[data-modal=identifier]');
    $confirm = $fixture.find('[data-confirm=identifier]');
    $cancel = $fixture.find('[data-cancel=identifier]');
    $modalContent = $fixture.find('.modal-content');
  });

  describe("opening and closing the modal", function () {
    beforeEach(function () {
      new ConfirmModal(fixture, 'identifier');
    });

    it("shows the modal when the trigger is clicked", function () {
      $trigger.click();

      expect($modal).toHaveClass('show');
    });

    it("closes the modal when the backdrop, confirm or cancel is clicked", function () {
      $trigger.click();
      $confirm.click();

      expect($modal).not.toHaveClass('show');

      $trigger.click();
      $cancel.click();

      expect($modal).not.toHaveClass('show');

      $trigger.click();
      $modal.click();

      expect($modal).not.toHaveClass('show');
    });

    it("does not close the modal when the modal-content is clicked", function () {
      $trigger.click();
      $modalContent.click();

      expect($modal).toHaveClass('show');
    });
  });

  describe("callbacks", function () {
    var confirm;
    var cancel;

    beforeEach(function () {
      confirm = jasmine.createSpy('confirm');
      cancel = jasmine.createSpy('cancel');

      new ConfirmModal(fixture, 'identifier', {confirm: confirm, cancel: cancel});
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
      $modal.click();

      expect(confirm).not.toHaveBeenCalled();
      expect(cancel).toHaveBeenCalled();
    });
  });
});
