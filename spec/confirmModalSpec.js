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
      new ConfirmModal('really', function () {});
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
    var success;
    beforeEach(function () {
      success = jasmine.createSpy('success');
      new ConfirmModal('really', success);
    });

    it("calls the success callback on confirm", function () {
      $trigger.click();
      $confirm.click();

      expect(success).toHaveBeenCalled();
    });

    it("does not call the success callback on cancel", function () {
      $trigger.click();
      $cancel.click();

      expect(success).not.toHaveBeenCalled();

      $trigger.click();
      $backdrop.click();

      expect(success).not.toHaveBeenCalled();
    });
  });

});
