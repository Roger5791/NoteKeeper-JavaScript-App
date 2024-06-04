"use strict";

const $overlay = document.createElement("div");
$overlay.classList.add("overlay", "modal-overlay");


const NoteModal = function (
  title = "",
  text = "",
  time = ""
) {
  const $modal = document.createElement("div");
  $modal.classList.add("modal");

  $modal.innerHTML = `
    <button class="icon-btn large" aria-label="Close modal" data-close-btn>
      <span class="material-symbols-rounded" aria-hidden="true">close</span>
      <div class="state-layer"></div>
    </button>

    <input
      type="text"
      placeholder="Untitled"
      value="${title}"
      class="modal-title text-title-medium"
      data-note-field
    />

    <textarea
      placeholder="Add your Note..."
      class="modal-text text-body-large custom-scrollbar"
      data-note-field
    >${text}</textarea>

    <div class="modal-footer">
      <span class="time text-label-large">${time}</span>
      <button class="btn text" data-submit-btn>
        <span class="text-label-large">Save</span>
        <div class="state-layer"></div>
      </button>
    </div>
  `;

  const $submitBtn = $modal.querySelector("[data-submit-btn]");
  $submitBtn.disabled = true;

  const [$titleField, $textField] =
      $modal.querySelectorAll("[data-note-field]");

  const enableSubmit = function () {
    $submitBtn.disabled = !$titleField.value && !$textField.value;
  };

  $textField.addEventListener("keyup", enableSubmit);
  $titleField.addEventListener("keyup", enableSubmit);

  /**
   * Opens the note modal by appending it to the document body and setting focus on the title field.
   */
  const open = function () {
    document.body.appendChild($modal);
    document.body.appendChild($overlay);
    $titleField.focus();
  };

  /**
   * Closes the note modal by removing it from the document body.
   */
  const close = function () {
    document.body.removeChild($modal);
    document.body.removeChild($overlay);
  };

  // Attach click event to closeBtn, when click call the close modal function.
  const $closeBtn =
      $modal.querySelector("[data-close-btn]");
  $closeBtn.addEventListener("click", close);

  /**
   * Handles the submission of a note within a model
   * @param {Function} callback - The callback function to execute with the submitted note data
   */

  const onSubmit = function (callback) {
    $submitBtn.addEventListener("click", function () {
      const noteData = {
        title: $titleField.value,
        text: $textField.value,
      };

      callback(noteData);
    });
  };

  return { open, close, onSubmit };
};

/**
 * Creates and manages a modal for confirming the deletion
 */

const DeleteConfirmModel = function (title) {
  const $modal = document.createElement("div");
  $modal.classList.add("modal");

  $modal.innerHTML = `
    <h3 class="modal-title text-title-medium">
      Are you sure you want to delete <strong>"${title}"</strong> ?
    </h3>
    <div class="modal-footer">
      <button class="btn text" data-action-btn="false">
        <span class="text-label-large">Cancel</span>
        <div class="state-layer"></div>
      </button>
      <button class="btn fill" data-action-btn="true">
        <span class="text-label-large">Delete</span>
        <div class="state-layer"></div>
      </button>
    </div>`;

  /**
   * Opens the delete confirmation modal by appending it to the document body
   */
  const open = function () {
    document.body.appendChild($modal);
    document.body.appendChild($overlay);
  };

  /**
   * Closes the delete confirmation modal by removing it from the 
  document body
*/
  const close = function () {
    document.body.removeChild($modal);
    document.body.removeChild($overlay);
  };

  const $actionBtns =
      $modal.querySelectorAll("[data-action-btn]");

  /**
   * Handles the submission of the delete confirmation.
   * @param {Function} callback - The callback function to execute
with the confirmation result (true for confirmation, false for cancel).
*/

  const onSubmit = function (callback) {
    $actionBtns.forEach(($btn) => {
      $btn.addEventListener("click", function () {
        const isConfirm = this.dataset.actionBtn === "true";

        callback(isConfirm);
      });
    });
  };

  return { open, close, onSubmit };
};

export { DeleteConfirmModel, NoteModal };
