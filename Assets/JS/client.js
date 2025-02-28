"use strict";

import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const $sidebarList = document.querySelector(
    "[data-sidebar-list]"
  );
const $notePanelTitle = document.querySelector(
    "[data-note-panel-title]"
  );
const $notePanel =
    document.querySelector("[data-note-panel]");
const $noteCreateBtns = document.querySelectorAll(
    "[data-note-create-btn]"
  );

const emptyNoteTemplate = `
    <div class="empty-notes">
      <span class="material-symbols-rounded" aria-hidden="true">
        note_stack
      </span>
      <div class="text-headline-small">No notes</div>
    </div>
  `;

/**
 * Enables or disables "Create Note" buttons based on whether there are any notebooks.
 * @param {boolean} isThereAnyNotebook - Indicates whether there are any notebooks
 */
const disableNoteCreateBtns = function (isThereAnyNotebook) {
  $noteCreateBtns.forEach(($item) => {
    $item[isThereAnyNotebook ? "removeAttribute" : "setAttribute"](
      "disabled",
      ""
    );
  });
};

/**
 * The client object manages interactions with the user interface
(UI) to create, read, update, and delete notebooks and notes.
 * It provides functions for performing these operations and updating the UI accordingly.
 * @namespace
 * @property {Object} notebook - Functions for managing notebooks in
 * @property {Object} note - Functions for managing notes in the UI.
*/

export const client = {
  notebook: {
    /**
     * Creates a new notebook in the UI, based on provided notebook data.
     * @param {Object} notebookData - Data representing the new notebook.
     */
    create(notebookData) {
      const $navItem = NavItem(
          notebookData.id,
          notebookData.name
        );
      $sidebarList.appendChild($navItem);
      activeNotebook.call($navItem);
      $notePanelTitle.textContent = notebookData.name;
      $notePanel.innerHTML = emptyNoteTemplate;
      disableNoteCreateBtns(true);
    },

    /**
     * Reads and displays a list of notebooks in the UI.
     * @param {Array<Object>} notebookList - List of notebook data to display.
     */
    read(notebookList) {
      disableNoteCreateBtns(notebookList.length);

      notebookList?.forEach((notebookData, index) => {
        const $navItem = NavItem(
            notebookData.id,
            notebookData.name
          );

        if (index === 0) {
          activeNotebook.call($navItem);
          $notePanelTitle.textContent = notebookData.name;
        }

        $sidebarList.appendChild($navItem);
      });
    },

    /**
     * Updates the UI to reflect changes in a notebook.
     *
     * @param {string} notebookId - ID of the notebook to update.
     * @param {Object} notebookData - New data for the notebook.
     */
    update(notebookId, notebookData) {
      const $oldNotebook = document.querySelector(
          `[data-notebook="${notebookId}"]`
        );
      const $newNotebook = NavItem(
          notebookData.id,
          notebookData.name
        );

      $notePanelTitle.textContent = notebookData.name;
      $sidebarList.replaceChild($newNotebook, $oldNotebook);
      activeNotebook.call($newNotebook);
    },

    /**
     * Delete a notebook from the UI
     * @param {string} notebookId - ID of the notebook of delete.
     */
    delete(notebookId) {
      const $deleteNotebook = document.querySelector(
          `[data-notebook='${notebookId}']`
        );
      const $activeNavItem =
          $deleteNotebook.nextElementSibling ??
          $deleteNotebook.previousElementSibling;

      if ($activeNavItem) $activeNavItem.click();
      else {
        $notePanelTitle.innerHTML = "";
        $notePanel.innerHTML = "";
        disableNoteCreateBtns(false);
      }

      $deleteNotebook.remove();
    },
  },

  note: {
    /**
     * Creates a new note card in the UI based on provided note data.
     * @param {Object} noteData - Data representing the new note
     */
    create(noteData) {
      // Clear 'emptyNotesTemplate' from 'notePanel' if there is no note exists
      if (!$notePanel.querySelector("[data-note]")) $notePanel.innerHTML = "";

      // Append card in notePanel
      const $card = Card(noteData);
      $notePanel.appendChild($card);
    },

    /**
     * Reads and display a list of notes in the UI.
     * @param {Array<Object>} noteList - List of note data to display.
     */
    read(noteList) {
      if (noteList.length) {
        $notePanel.innerHTML = "";

        noteList.forEach((noteData) => {
          const $card = Card(noteData);
          $notePanel.appendChild($card);
        });
      } else {
        $notePanel.innerHTML = emptyNoteTemplate;
      }
    },

    /**
     * Updates a note card in the UI based on provided note data.
     * @param {string} noteId - ID of the note to update.
     * @param {Object} noteData - New data for the note.
     */
    update(noteId, noteData) {
      const $oldCard = document.querySelector(
          `[data-note="${noteId}"]`
        );
      const $newCard = Card(noteData);
      $notePanel.replaceChild($newCard, $oldCard);
    },

    /**
     * Delete a note card from the UI.
     * @param {string} noteId - ID of the note to delete.
     * @param {boolean} isNoteExists - Indicates whether other notes still exist.
     */
    delete(noteId, isNoteExists) {
      document.querySelector(`[data-note="${noteId}"]`).remove();
      if (!isNoteExists) $notePanel.innerHTML = emptyNoteTemplate;
    },
  },
};
