var Example = window.Example || {}; // Declare and use namespace for client-side script
(function () {
  this.alertOnLoad = function (primaryControl) {
    console.log("js> The client-side script is running!"); // Verify the client-side script is running before any other processes
    // Display the confirm dialog for cloning opportunity process
    Xrm.Navigation.openConfirmDialog({
      title: "Confirm Clone Opportunity Action", // Confirm dialog title
      text: "Are you sure you want to execute this action?", // Confirm dialog subtitle
    }).then(function (result) {
      if (result.confirmed) {
        console.log("js> User confirmed to proceed."); // User confirm to proceed with the process
        // Initialize the opportunity cloning process
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
                entity: {
                  typeName: "mscrm.opportunity",
                  structuralProperty: 5,
                },
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
            // Navigate to to the cloned opportunity form based on the the output GUID
            if (output) {
              const entityFormOptions = {
                entityName: "opportunity", // Entity logical name
                entityId: output, // The GUID returned in the response
              };
              Xrm.Navigation.openForm(entityFormOptions)
                .then(function (result) {
                  console.log(
                    `js> Form for cloned opportunity ${output} opened successfully!`
                  );
                })
                .catch(function (error) {
                  console.log("js> Error opening form: " + error.message);
                });
            } else {
              console.log("js> Invalid GUID in the response.");
            }
          })
          .catch(function (error) {
            Xrm.Utility.closeProgressIndicator(); // Close the progress indicator if it's the failed case for executing plugin and bound custom action
            console.log("js> Bound Custom Action Error: ", error.message); // Display the error message if it's the failed case for executing plugin and bound custom action
            // Display an error dialog if it's the failed case for executing plugin and bound custom action
            Xrm.Navigation.openErrorDialog({
              message:
                "An error occurred while executing the bound custom action.",
              details: error.message,
            });
          });
      } else {
        console.log("js> User cancelled the action."); // User cancel the process
      }
    });
  };
}).call(Example);
// https://medium.com/@furkankaracan/dynamics-365-how-to-get-row-data-from-sub-grids-ccdfbd923426
// A combination of using ChatGPT and reading docs
