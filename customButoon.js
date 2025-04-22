var Example = window.Example || {};
(function () {
  this.alertOnLoad = function (
    selectedControlSelectedItemIds,
    selectedControl
  ) {
    console.log("Hello World 2");
    selectedControlSelectedItemIds.forEach((element) => {
      const entityId = element;
      const execute_crff8_BoundActionOpportunity_Request = {
        // Parameters
        entity: { entityType: "opportunity", id: entityId }, // entity

        getMetadata: function () {
          return {
            boundParameter: "entity",
            parameterTypes: {
              entity: { typeName: "mscrm.opportunity", structuralProperty: 5 },
            },
            operationType: 0,
            operationName: "crff8_BoundActionOpportunity",
          };
        },
      };

      Xrm.WebApi.execute(execute_crff8_BoundActionOpportunity_Request)
        .then(function success(response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (responseBody) {
          const result = responseBody;
          console.log(result);
          // Return Type: mscrm.crff8_BoundActionOpportunityResponse
          // Output Parameters
          const output = result["output"]; // Edm.String
          console.log(output);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
    // try {
    //   // debugger;
    //   const formContext = selectedControl;
    //   const selectedItems = formContext.getGrid().getSelectedRows();
    //   selectedItems.forEach(function (row) {
    //     const entity = row.getData().getEntity();
    //     let id = entity.getId();
    //     console.log("Selected record ID: " + id);
    //     let name = entity.attributes.get("name")?.getValue();
    //     console.log("Selected record Name: " + name);
    //   });
    //   alert("hello world was clicked!");
    // } catch (error) {
    //   debugger;
    //   console.error(`Error message for "alertOnLoad()": ` + error);
    // }
  };
}).call(Example);
// https://medium.com/@furkankaracan/dynamics-365-how-to-get-row-data-from-sub-grids-ccdfbd923426
// A combination of using ChatGPT and reading docs
