var Example = window.Example || {};
(function () {
  this.alertOnLoad = function (selectedControl) {
    try {
      // debugger;
      let formContext = selectedControl;
      console.log(selectedControl);
      alert("hello world was clicked!");
    } catch (error) {
      debugger;
      console.error(`Error message for "alertOnLoad()": ` + error);
    }
  };
}).call(Example);
