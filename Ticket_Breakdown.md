# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including Acceptance criteria, time/Time estimates, and Action points. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

These are the tickets I came up with:

- [Update database schema](#ticket1)
- [Update API to allow custom id input](#ticket2)
- [Update getShiftsByFacility function](#ticket3)
- [Update generateReport function](#ticket4)
- [Testing and documentation](#ticket5)

## <a name="ticket1"></a>Update database schema

**Description**: 
Update database schema to allow `Facilities` to store custom `Agent` ids. 

**Time estimate**: 2-3 hours 

**Action points**: 
1. Add a new column `custom_id` to the `Agents` table.
2. Make sure the `custom_id` is optional because all `Facilities` will have custom ids right away. 
3. The custom_id can be a `VARCHAR` type to handle alphanumeric identifiers.

**Acceptance criteria**: 
The `Agents` table in the database should have a new column named `custom_id` that can hold the custom ids for Agents. The column should allow for null entries.


## <a name="ticket2"></a>Update API to allow custom id input

**Description**: 
Update existing API endpoints to allow for the input and output of the new `custom_id`.

**Time estimate**: 4-5 hours 

**Action points**: 
1. Update `POST` and `PUT` endpoints for Agents to accept `custom_id` as a parameter.
2. Ensure `GET` endpoints for Agents return the `custom_id` when available.
3. Update API validators to handle `custom_id` as a possible field. This should be performed in the request handling middleware.

**Acceptance criteria**: 
The API endpoints should allow for the input of a `custom_id` when creating or updating an Agent and return the `custom_id` in response to `GET` requests.

## <a name="ticket3"></a>Update getShiftsByFacility function

**Description**: 
Update the `getShiftsByFacility` function to include the `custom_id` if available.

**Time estimate**: 3-4 hours 

**Action points**: 
1. Modify the function to join `Shifts` and `Agents` tables and return the `custom_id` field.
2. If `custom_id` is not available, return the regular `id`.

**Acceptance criteria**: 
The `getShiftsByFacility` function should return `custom_id` for each Agent involved in a Shift. If `custom_id` is not available, it should return the regular `id`.


## <a name="ticket4"></a>Update generateReport function

**Description**: 
Update the `generateReport` function to use the `custom_id` when generating the PDF report.

**Time estimate**: 4-5 hours 

**Action points**: 
1. Update the function to replace the use of `id` with `custom_id` in the generated report.
2. If `custom_id` is not available, fall back to the `id`.

**Acceptance criteria**: 
The `generateReport` function should use `custom_id` in the generated report. If `custom_id` is not available, it should use the regular `id`.


## <a name="ticket5"></a>Testing and documentation

**Description**: 
We need to test that the changes do not affect existing functionality and update our documentation with the changes.

**Time estimate**: 3-4 hours 

**Action points**: 
1. Add or adjust tests that check that all the new changes work as expected. Add a separate E2E test case with `custom_id`. 
2. Update the API documentation to reflect the changes made to the endpoints.
3. Update the internal system documentation to reflect the changes made to the `getShiftsByFacility` and `generateReport` functions.

**Acceptance criteria**: 
All changes should work without affecting existing functionality. All documentation should be updated to reflect the new changes.
