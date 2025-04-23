var Example = window.Example || {};
(function () {
  this.alertOnLoad = function (primaryControl) {
    console.log("Hello World 2");
    Xrm.Utility.showProgressIndicator("Loading, please wait...");
    const formContext = primaryControl;
    const entityId = formContext.data.entity.getId();
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
        Xrm.Utility.closeProgressIndicator();
        // Return Type: mscrm.crff8_BoundActionOpportunityResponse
        // Output Parameters
        const output = result["output"]; // Edm.String
        console.log(output);
        if (output) {
          const entityFormOptions = {
            entityName: "opportunity", // Entity logical name
            entityId: output, // The GUID returned in the response
          };
          Xrm.Navigation.openForm(entityFormOptions)
            .then(function (result) {
              console.log("Form opened successfully!");
            })
            .catch(function (error) {
              console.log("Error opening form: " + error.message);
            });
        } else {
          console.log("Invalid GUID in the response.");
        }
      })
      .catch(function (error) {
        Xrm.Utility.closeProgressIndicator();
        console.log(error.message);
      });
  };
}).call(Example);
// https://medium.com/@furkankaracan/dynamics-365-how-to-get-row-data-from-sub-grids-ccdfbd923426
// A combination of using ChatGPT and reading docs
