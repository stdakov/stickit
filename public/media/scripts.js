"use strict";
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function htmlEntities(html) {
  html = html.replace(/[<>]/g, function (match) {
    if (match === "<") return "&lt;";
    else return "&gt;";
  });
  return html;
}
var LocalStorage = new (function () {
  this.storageSpace = "";
  this.data = [];

  this.init = function (localStorageSpage) {
    this.storageSpace = localStorageSpage;
    var localStorageData = JSON.parse(localStorage.getItem(this.storageSpace));
    if (localStorageData !== null) {
      this.data = localStorageData;
    }
  };

  this.store = function () {
    localStorage.setItem(this.storageSpace, JSON.stringify(this.data));
  };

  this.getAll = function () {
    return this.data;
  };

  this.add = function (title, body, color) {
    var id = 0;
    if (this.data.length > 0) {
      $.each(this.data, function (index, item) {
        if (id < item.id) {
          id = item.id;
        }
      });
    }
    var item = {
      id: id + 1,
      title: title == null || title == "" ? "-" : title,
      body: escapeHtml(body).replace(/\r?\n/g, "<br />"),
      color: color,
    };
    this.data.push(item);
    this.store();

    return item;
  };

  this.get = function (id) {
    var indexItem = -1;
    $.each(this.data, function (index, item) {
      if (id == item.id) {
        indexItem = index;
        return false; //break
      }
    });
    if (indexItem > -1 && indexItem < this.data.length) {
      return this.data[indexItem];
    }
  };

  this.remove = function (id) {
    var indexItem = -1;
    $.each(this.data, function (index, item) {
      if (id === item.id) {
        indexItem = index;
        return false; //break
      }
    });
    if (indexItem > -1 && indexItem < this.data.length) {
      this.data.splice(indexItem, 1);
      this.store();
    }
  };
})();

$(document).ready(function () {
  LocalStorage.init("StickIt");
  var items = LocalStorage.getAll();

  $.each(items, function (index, item) {
    loadElement(item);
  });

  $("form").submit(function (event) {
    event.preventDefault();
    var title = $("#headerInput").val();
    var body = $("#bodyInput").val();
    if (body == "") {
      alert("The body is empty!");
      return false;
    }
    var radioValue = $("form input[name='inlineRadioOptions']:checked").val();
    var item = LocalStorage.add(title, body, radioValue);
    $("#headerInput").val("");
    $("#bodyInput").val("");
    loadElement(item);
    $("#stickyForm").modal("toggle");
  });

  $(document).on("click", ".remove", function (e) {
    e.preventDefault();

    if (confirm("Delete sticky?")) {
      var parent = $(this).parents(".card");

      LocalStorage.remove(parent.data("item-id"));
      parent.remove();
    }
  });

  $(document).on("click", ".card-columns .card", function (e) {
    e.preventDefault();
    var target = $(e.target);
    var itemId = $(this).data("item-id");
    var item = LocalStorage.get(itemId);
    if (target.is("button") && target.hasClass("btn-copy")) {
      copyText(item.body);
      target.fadeOut(500).fadeIn(500);
      return false;
    }
    if (target.is("button")) {
      return false;
    }

    if (getSelectedText() != "") {
      return false;
    }

    $("#exampleModalLabel").text(item.title);
    $("#exampleModalBody").html(item.body);
    $("#exampleModal").modal();
  });

  $(document).on("change", ".navbar input", function (e) {
    e.preventDefault();
    var radioValue = $("input[name='inlineRadioOptions']:checked").val();
    $(".card-columns > .card").each(function () {
      if (radioValue != "all" && !$(this).hasClass("bg-" + radioValue)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  function loadElement2(item) {
    var parentPanel = $("body").find(".card-columns");
    var status = "";

    var element =
      '<div class="card text-white bg-' +
      item.color +
      '" data-item-id="' +
      item.id +
      '">\n' +
      '<div class="card-header">' +
      item.title +
      "\n" +
      '<button class="btn-danger remove float-right">x</button>\n' +
      "</div>\n" +
      '<blockquote class="blockquote mb-0 card-body">\n' +
      "<p>" +
      item.body +
      "</p>\n" +
      "</blockquote>\n" +
      "</div>";

    parentPanel.append(element);
  }

  function loadElement(item) {
    var parentPanel = $("body").find(".card-columns");

    var element =
      '<div class="card ' +
      (item.color != "white" ? "text-white" : "") +
      "  bg-" +
      item.color +
      '" data-item-id="' +
      item.id +
      '">\n' +
      '<div class="card-header">' +
      (item.title == null || item.title == "" ? "-" : item.title) +
      "\n" +
      '<button class="btn btn-sm btn-danger remove float-right">x</button>\n' +
      '<button class="btn btn-sm btn-copy float-right">copy</button>\n' +
      "</div>\n" +
      '<div class="card-body">\n' +
      '<p class="card-text">' +
      truncateText(item.body, 574) +
      "</p>\n" +
      "</div>\n" +
      "</div>";

    parentPanel.append(element);
  }

  function truncateText(text, length) {
    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + "\u2026";
  }

  function getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    } else if (document.selection) {
      return document.selection.createRange().text;
    }
    return "";
  }

  function copyText(copyText) {
    var fullLink = document.createElement("input");
    document.body.appendChild(fullLink);
    fullLink.value = copyText;
    fullLink.select();
    document.execCommand("copy", false);
    fullLink.remove();

    // copyText.select();
    // copyText.setSelectionRange(0, 99999);
    // document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
  }
});
