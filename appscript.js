function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); 
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.subject,
    data.message,
  ]);

  // Send Email Notification with HTML
  sendEmailNotification(data);

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

// Function to Send Email
function sendEmailNotification(data) {
  var recipient = "kvonline9878@gmail.com"; // Change this to your email
  var subject = "📩 Recruiter Mail | " + data.subject;

  var htmlBody = `
  <div style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; padding: 20px; color: black; max-width: 700px; margin: auto; font-weight: normal;">
        <h2 style="margin-bottom: 20px; font-size: 22px; letter-spacing: 1px;">
            📩 Recruiter Mail
        </h2>

            <p style="font-size: 25px;">${data.message}</p>
            <p style="font-size: 20px;">${data.name} (${data.email})</p>
            <p>${data.subject}</p>

    </div>`;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}
