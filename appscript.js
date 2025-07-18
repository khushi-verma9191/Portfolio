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
    <div
        style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; padding: 20px; background: #121212; color: #e0e0e0; max-width: 600px; margin: auto; border-radius: 12px; font-weight: normal; border: 1px solid #2c2c2c;">
        <h2 style="color: #ffffff; text-align: center; margin-bottom: 20px; font-size: 22px; letter-spacing: 1px;">
            📩 Recruiter Mail
        </h2>

        <table
            style="width: 100%; border-collapse: collapse; font-size: 15px; background-color: #1e1e1e; border-radius: 8px; overflow: hidden;">
            <thead>
                <tr style="background: #2c2c2c;">
                    <th colspan="2"
                        style="padding: 12px 10px; color: #ffffff; text-align: center; font-size: 16px; border-bottom: 1px solid #444;">
                        Details
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border: 1px solid #444; font-weight: bold; width: 30%;">Name</td>
                    <td style="padding: 10px; border: 1px solid #444;">${data.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #444; font-weight: bold;">Email</td>
                    <td style="padding: 10px; border: 1px solid #444;">${data.email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #444; font-weight: bold;">Subject</td>
                    <td style="padding: 10px; border: 1px solid #444;">${data.subject}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #444; font-weight: bold;">Message</td>
                    <td style="padding: 10px; border: 1px solid #444;">${data.message}</td>
                </tr>
            </tbody>
        </table>

    </div>`;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}
