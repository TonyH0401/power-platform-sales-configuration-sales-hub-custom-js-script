var Example = window.Example || {}; // Declare and use namespace for client-side script
(function () {
  this.alertOnLoad = function (primaryControl) {
    console.log("js> The client-side script is running!"); // Verify the client-side script is running
    Xrm.Utility.showProgressIndicator("Loading, please wait..."); // Initialize progress indicator
    const formContext = primaryControl;
    const entityId = formContext.data.entity.getId(); // Get the record GUID
    // Prepare request for the Bound Custom Action with the "entityId"
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
    // Execute the Bound Custom Action with the prepared request
    Xrm.WebApi.execute(execute_crff8_BoundActionOpportunity_Request)
      .then(function success(response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (responseBody) {
        const result = responseBody;
        console.log(
          "js> Plugin and Bound Custom Action completed successfully: ",
          result
        ); // Display the result after plugin and bound custom action completed successfully
        Xrm.Utility.closeProgressIndicator(); // Close the progress indicator if it's the success case for executing plugin and bound custom action
        // Return Type: mscrm.crff8_BoundActionOpportunityResponse
        // Output Parameters
        const output = result["output"]; // Edm.String
        console.log("js> Output parameter: ", output); // Display the output parameter value

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
        Xrm.Utility.closeProgressIndicator(); // Close the progress indicator if it's the failed case for executing plugin and bound custom action
        console.log(error.message);
      });
  };
}).call(Example);
// https://medium.com/@furkankaracan/dynamics-365-how-to-get-row-data-from-sub-grids-ccdfbd923426
// A combination of using ChatGPT and reading docs
