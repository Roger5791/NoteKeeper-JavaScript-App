"use strict";

/**
 * Attaches an event listener to a collection of DOM elements
 * @param {NodeList} $elements - An array of DOM elements to attach the event listener to.
 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'mouseover')
 * @param {Function} callback - The function to be executed when the event occur
 */

const addEventOnElements = function ($elements, eventType, callback) {
  for (const item of $elements) {
    item.addEventListener(eventType, callback);
  }
};

/**
 * Generates a greeting message based on the current hour of the day
 * @param {number} currentHour - The current hour (0 - 23) to determine the appropriate greeting
 * @returns {string} A greeting message with a salutation corresponding to the time of day
 */

const getGreetingMsg = (currentHour) => {
  const greeting =
      currentHour < 5
        ? "Night"
        : currentHour < 12
        ? "Morning"
        : currentHour < 15
        ? "Noon"
        : currentHour < 17
        ? "Afternoon"
        : currentHour < 20
        ? "Evening"
        : "Night";

  return `Good ${greeting}`;
};

let $lastActiveItem;

/**
 * Activates a navigation item by adding the 'active' class and 
deactivates the previously active item.
 */

const activeNotebook = function () {
  $lastActiveItem?.classList.remove("active");
  this.classList.add("active");
  $lastActiveItem = this;
};

/**
*
* Makes a DOM element editable by setting the 'contenteditable'
attribute to true and focusing on it.
* @param {HTMLElement} $element - The DOM element to make editable.
*/

const makeElemEditable = function ($element) {
  $element.setAttribute("contenteditable", true);
  $element.focus();
};

/**
 * Generates a unique ID based on the current timestamp.
 * @returns {string} A string representation of the current timestamp.
 */

const generateID = function () {
  return new Date().getTime().toString();
};

/**
 * Finds a notebook in the database by its ID.
 *
 * @param {Object} db - The database containing the notebooks.
 * @param {string} notebookId - The ID of the notebook to find.
 * @returns {Object | undefined} The found notebook object, or undefined if not found.
 */

const findNotebook = (db, notebookId) => {
  return db.notebooks.find((notebook) => notebook.id == notebookId);
};

/**
 * Finds the index of a notebook in an array of notebooks based on its ID.
 * @param {Object} db - The object containing an array of notebooks.
 * @param {string} notebookId - The ID of the notebook to find.
 * @returns {number} - The index of the found notebook, or -1 if not found.
 */

const findNotebookIndex = (db, notebookId) => {
  return db.notebooks.findIndex((item) => item.id === notebookId);
};

/**
 * Converts a timestamp in milliseconds to a human-readable relative
time string.
 * @param {number} milliSeconds - The timestamp in milliseconds to convert.
 * @returns {string} - A string representing the relative time (e.g., "Just now," "5 min ago," "3 hours ago, " "2 days ago").
 */

const getRelativeTime = function (milliSeconds) {
  const currentTime = new Date().getTime();

  let minute = Math.floor(
      (currentTime - milliSeconds) / 1000 / 60
    );
  let hour = Math.floor(minute / 60);
  let day = Math.floor(hour / 24);

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : day === 1
    ? `${day} day ago`
    : `${day} days ago`;
};

/**
 * Finds a specific note by its ID within a database of notebooks and their notes.
 *
 * @param {Object} db
 * @param {string} noteId
 * @returns {Object | undefined} The found note object, or undefined if not found.
 */

const findNote = function (db, noteId) {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id === noteId);
    if (note) break;
  }
  return note;
};

/**
 * Finds the index of a note in a notebook's array of notes based on its ID.
 * @param {Object} notebook - The notebook object containing an array of notes.
 * @param {string} noteId - The ID of the note to find.
 * @returns {number} - The index of the found note, or -1 if not found.
 */
const findNoteIndex = function (notebook, noteId) {
  return notebook.notes.findIndex((note) => note.id === noteId);
};

export {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNote,
  findNoteIndex,
};
