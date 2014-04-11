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
    )

    new ConfirmModal('really');
    $trigger = $('[data-trigger=really]');
    $modal = $('[data-modal=really]');
    $confirm = $('[data-confirm=really]');
    $cancel = $('[data-cancel=really]');
    $backdrop = $('.modal-backdrop');
  });

  describe("opening an closing the modal", function () {
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

});
