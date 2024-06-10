$(".info__error-message").slideUp(0);
$(".thankyou-container").animate({ width: 0, height: 0 });

$("#name").keypress(function (event) {
  if (
    (isNaN(event.key) === false && event.key !== " ") ||
    isCharacter(event.key) === false
  ) {
    event.preventDefault();
  }
});

$("#name").on("input", function () {
  $("#inp_name").text(this.value);
});

function isCharacter(ch) {
  const charRegex = /^[a-zA-Z\s]+$/;
  return charRegex.test(ch);
}

$("#number").on("input", function () {
  let li = Array.from({ length: 16 }, (_, n) => "0");
  li.splice(4, 0, " ");
  li.splice(9, 0, " ");
  li.splice(14, 0, " ");
  let new_li = li.join("");
  $("#inp_number").text(this.value + new_li.slice(this.value.length));
});

$("#number").on("keyup", function (event) {
  if (
    event.key === "Backspace" &&
    (this.value.length === 5 ||
      this.value.length === 10 ||
      this.value.length === 15)
  ) {
    this.value = this.value.slice(0, -1);
  }
});

$("#number").on("keypress", function (event) {
  if (this.value.length > 18 || isNaN(event.key)) {
    event.preventDefault();
  }
  if (
    this.selectionStart !== this.value.length ||
    this.selectionStart !== this.selectionEnd
  ) {
    this.selectionStart = this.value.length;
    this.selectionEnd = this.value.length;
    setTimeout(() => {
      this.focus();
    }, 0);
  }
  if (
    this.value.length === 4 ||
    this.value.length === 9 ||
    this.value.length === 14
  ) {
    this.value += " ";
  }
});

$("#exp-mm").keypress(function (event) {
  if (this.value.length > 1) {
    event.preventDefault();
  }
});

$("#exp-mm").on("input", function () {
  let li = Array.from({ length: 2 }, (_, n) => "0");
  let new_li = li.join("");
  $("#inp_exp_date_mm").text(this.value + new_li.slice(this.value.length));
});

$("#exp-yy").on("input", function () {
  let li = Array.from({ length: 2 }, (_, n) => "0");
  let new_li = li.join("");
  $("#inp_exp_date_yy").text(this.value + new_li.slice(this.value.length));
});

$("#exp-yy").keypress(function (event) {
  if (this.value.length > 1) {
    event.preventDefault();
  }
});

$("#cvc").keypress(function (event) {
  if (this.value.length > 2) {
    event.preventDefault();
  }
});

$("#cvc").on("input", function () {
  let li = Array.from({ length: 3 }, (_, n) => "0");
  let new_li = li.join("");
  $("#inp_cvc").text(this.value + new_li.slice(this.value.length));
});

$(".main__info-container").keypress(function (event) {
  if (event.keyCode === 13) {
    let currentField = $(":focus");
    let nextTabIndex = currentField.attr("tabIndex") * 1 + 1;
    let nextField = $("[tabIndex='" + nextTabIndex + "']");

    if (nextField) {
      nextField.focus();
    }
    event.preventDefault();

    if (nextTabIndex > 6) {
      $("#confirm").click();
    }
  }
});

$("#confirm").click(function (event) {
  let errors = 4;
  event.preventDefault();

  if ($("#name").val() === "") {
    $("#error--name").slideUp();
    setTimeout(() => {
      $("#error--name").slideDown();
      $("#name").addClass("error-warning");
    }, 400);
  } else {
    $("#error--name").slideUp();
    $("#name").removeClass("error-warning");
    errors--;
  }

  if ($("#number").val() === "" || $("#number").val().length < 19) {
    $("#error--number").slideUp();
    setTimeout(() => {
      $("#error--number").slideDown();
      $("#number").addClass("error-warning");
    }, 400);
  } else {
    $("#error--number").slideUp();
    $("#number").removeClass("error-warning");
    errors--;
  }

  if (
    $("#exp-mm").val() === "" ||
    $("#exp-yy").val() === "" ||
    $("#exp-mm").val().length < 2 ||
    $("#exp-yy").val().length < 2
  ) {
    $("#error--exp").slideUp();
    setTimeout(() => {
      $("#error--exp").slideDown();
      if ($("#exp-mm").val() === "") {
        $("#exp-mm").addClass("error-warning");
      } else {
        $("#exp-mm").removeClass("error-warning");
      }
      if ($("#exp-yy").val() === "") {
        $("#exp-yy").addClass("error-warning");
      } else {
        $("#exp-yy").removeClass("error-warning");
      }
    }, 400);
  } else {
    $("#error--exp").slideUp();
    errors--;
  }

  if ($("#cvc").val() === "" || $("#cvc").val().length < 3) {
    $("#error--cvc").slideUp();
    setTimeout(() => {
      $("#error--cvc").slideDown();
      $("#cvc").addClass("error-warning");
    }, 400);
  } else {
    $("#error-cvc").slideUp();
    $("#cvc").removeClass("error-warning");
    errors--;
  }

  if (errors === 0) {
    $(".main__info-container").animate({ width: 0, height: 0 });
    $(".thankyou-container").animate({ width: "100%", height: "100vh" });
  }
});

$("#continue").click(function () {
  $(".inp").val("");
  $(".inp").removeClass("error-warning");
  $(".info__error-message").slideUp();

  $("#inp_number").text("0000 0000 0000 0000");
  $("#inp_name").text("Jane Appleseed");
  $("#inp_exp_date_mm").text("00");
  $("#inp_exp_date_yy").text("00");
  $("#inp_cvc").text("000");
  setTimeout(() => {
    $(".thankyou-container").animate({ width: 0, height: 0 });
    $(".main__info-container").animate({ width: "100%", height: "100vh" });
  }, 200);
});
