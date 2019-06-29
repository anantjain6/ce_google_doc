/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
  DocumentApp.getUi()
    .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
    .addItem("Add Sites", "showAddSiteSidebar")
    .addToUi();  // Run the showAddSiteSidebar function when someone clicks the menu
}

/* Show a 300px sidebar with the HTML from googlemaps.html */
function showAddSiteSidebar() {
  var html = HtmlService.createTemplateFromFile("add_sites")
    .evaluate()
    .setTitle("Publish to Drupal - Add Sites"); // The title shows in the sidebar
  DocumentApp.getUi().showSidebar(html);
}

function testConnection(url, apiKey) { 
  var response = UrlFetchApp.fetch(url + '/google_docs/test_connection?apiKey=' + apiKey, {muteHttpExceptions: true});

  var ui = DocumentApp.getUi();
  if(response.getResponseCode() == 200) {
    var parms = JSON.parse(response.getContentText());
    if(parms.msg === 'ok') {
      var userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty('DISPLAY_UNITS', 'metric');
      ui.alert('Add Site', 'Site added successfully', ui.ButtonSet.OK);
    } else {
      ui.alert('Error', 'Incorrect API Key.', ui.ButtonSet.OK);
    }
  } else {
    ui.alert('Error', 'Incorrect Site URL.', ui.ButtonSet.OK);
  }
}

function showAlert(title, message) {
  var ui = DocumentApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}
