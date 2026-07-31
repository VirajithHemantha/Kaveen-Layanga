const SPREADSHEET_ID = "1Qu8vbYeDW4Ta-JIw_Gid-UbqsgcI2_I_UvrLFZRmj2w";
const RSVP_SHEET_NAME = "rsvp";
const WISH_SHEET_NAME = "wish";

function doGet() {
  return ContentService.createTextOutput("Wedding Apps Script is running.");
}

function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    const formType = String(data.formType || "").toLowerCase();

    if (formType === "rsvp") {
      writeRsvp_(data);
      return jsonResponse_({ ok: true, message: "RSVP saved" });
    }

    if (formType === "wish") {
      writeWish_(data);
      return jsonResponse_({ ok: true, message: "Wish saved" });
    }

    return jsonResponse_({ ok: false, message: "Unknown formType" });
  } catch (error) {
    return jsonResponse_({ ok: false, message: String(error) });
  }
}

function writeRsvp_(data) {
  const sheet = getOrCreateSheet_(RSVP_SHEET_NAME, [
    "Timestamp",
    "Full Name",
    "Guests",
    "Dietary Notes"
  ]);

  sheet.appendRow([
    new Date(),
    String(data.fullName || ""),
    String(data.guests || ""),
    String(data.dietaryNotes || "")
  ]);
}

function writeWish_(data) {
  const sheet = getOrCreateSheet_(WISH_SHEET_NAME, [
    "Timestamp",
    "Name",
    "Message"
  ]);

  sheet.appendRow([
    new Date(),
    String(data.name || ""),
    String(data.message || "")
  ]);
}

function getOrCreateSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
