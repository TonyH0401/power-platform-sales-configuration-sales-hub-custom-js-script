var Example = window.Example || {};
(function () {
  this.alertOnLoad = function (selectedControl) {
    try {
      // debugger;
      const formContext = selectedControl;
      const selectedItems = formContext.getGrid().getSelectedRows();
      selectedItems.forEach(function (row) {
        const entity = row.getData().getEntity();
        let id = entity.getId();
        console.log("Selected record ID: " + id);
        let name = entity.attributes.get("name")?.getValue();
        console.log("Selected record Name: " + name);
      });
      alert("hello world was clicked!");
    } catch (error) {
      debugger;
      console.error(`Error message for "alertOnLoad()": ` + error);
    }
  };
}).call(Example);
// https://medium.com/@furkankaracan/dynamics-365-how-to-get-row-data-from-sub-grids-ccdfbd923426
// A combination of using ChatGPT and reading docs