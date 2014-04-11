describe("confirmModal", function () {
  var $trigger;
  var $modal;
  var $confirm;
  var $cancel;
  var $backdrop;

  beforeEach(function () {
    $("#jasmine-content").html(
      "<span data-trigger='really'></span>" +
        "<div data-modal='really' style='display: none;'>" +
        "<span data-confirm='really'></span>" +
        "<span data-cancel='really'></span>" +
        "</div>" +
        "<div class='modal-backdrop' style='display: none;'></div>"
    );

    $trigger = $('[data-trigger=really]');
    $modal = $('[data-modal=really]');
    $confirm = $('[data-confirm=really]');
    $cancel = $('[data-cancel=really]');
    $backdrop = $('.modal-backdrop');
  });

  describe("opening and closing the modal", function () {
    beforeEach(function () {
      new ConfirmModal('really');
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
      new ConfirmModal('really', {confirm: confirm, cancel: cancel});
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
