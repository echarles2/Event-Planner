# Architectural Layout Document
## Created by: Lalaine Balmediano

## Repositories
**checklistRepo:**  This repository is responsible for handling data 
access related to Checklists. It also defines basic CRUD operations like: 
- fetchChecklists: returns all checklists
- getChecklistById: returns a specific checklist
- createChecklist: creates a new checklist
- updateChecklist: updates an existing checklist
- deleteChecklist: deletes a checklist
It is using the test Checklist data for now.

This repository handles the data-operations only, not for validation, checklist 
grouping, or UI-related components. This separation corrects solution concerns 
because any business rules is separated from the data access; and this mock data source 
can be swapped later with back-end introduction (ex: API or database).

checklistRepo is used inside the checklistService and the repository is called 
when fetching checklist data, creating new checklist entries, and 
deleting existing ones.

## Services
**checklistEventValidation:** makes sure that checklist entries tied to an event are valid.
It verifies if event exists (or not) and ensures that no duplicate event/personal checklist is allowed. 

This event validation is a business logic, so it belongs to the service layer to keep 
the event-related logic in the form centralized here. 

This service is used inside the checklistForm component where an event selection is needed. 

**groupChecklistsByEvent:** transforms a list of checklists into grouped sections 
based on their associated event, allowing the UI to show checklists grouped by event category.

This logic belongs in the service layer because it doesn't concern the repository nor fetch any data - 
it only groups the already-retreived checklist data. 

This logic is used in the ChecklistWrapper component where grouped checklist is rendered. 
The ChecklistWrapper component gets all checklists through the service, then calls groupChecklistsByEvent to organizes them, then the component will render the grouped sections 
in the UI.

**checklistItemValidation:** validates checklist item inputs before they are created. 
It makes sure that required fields aren't empty & follows the expected format, 
and any invalid data doesn't go to the repository. 

This validation logic is in the service layer because it is a business rule, not UI or data-access. 

This service is used in the checklistForm & checklistSection components. 
Before a checklist item is saved, the component calls checklistItemValidation. If 
validation passed, the service proceeds to the repository and if failed, error 
messages are returned to the component.

By placing these validation logics in the service layer, I don't have to duplicate them 
in the ChecklistForm / checklistSection components. Meaning, the components can focus 
on UI rendering & interaction instead. It also makes sure that the validations 
remain consistent & reusable across the application.