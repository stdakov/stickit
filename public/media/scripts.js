"use strict";

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
      body: body.replace(/\r?\n/g, "<br />"),
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
    var radioValue = $("input[name='inlineRadioOptions']:checked").val();
    var item = LocalStorage.add(title, body, radioValue);
    $("#headerInput").val("");
    $("#bodyInput").val("");
    loadElement(item);
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
    console.log(e);
    var target = $(e.target);
    if (target.is("button")) {
      return false;
    }

    var itemId = $(this).data("item-id");
    var item = LocalStorage.get(itemId);
    console.log(item);
    $("#exampleModalLabel").text(item.title);
    $("#exampleModalBody").html(item.body);
    $("#exampleModal").modal();
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
      '<button class="btn-danger remove float-right">x</button>\n' +
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
});
