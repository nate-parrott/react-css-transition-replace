"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearSelection = clearSelection;
/* global document, window */

function clearSelection() {
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}