# Architectural Layout Document
## Created by: Ethan Charles

## Repositories
AvailabilityRepository: This repository is responsible for handling data access related to availability entries. It defines basic CRUD operations like:
- getAll: returns all availability entries
- getById: returns a specific availability entry by id
- create: creates a new availability entry
- update: updates an existing availability entry
- upsertByDay: creates or updates an availability entry by day by invoking create or update based on whether an entry for the day already exists
- deleteByDay: deletes an availability entry by day
we use test availability data located in availabilityData.ts for now.

This repository is exclusively used for managing the data of the availability entries in the calendar component.
It is called in the availability service when saving or removing availability entries, and also directly in the calendar component when fetching all availability entries to display.

## Services
AvailabilityService: this service validates that the user has entered a day and status when attempting to add or update an availability entry.

This service is used in the calendar component to make sure that entries have valid data, and states what error to display based on the validation result.

It is used in the calendar component on form submit, and using the hook, displays an error message without proceeding to the repository if invalid.

## Hooks
useFormInput: this custom hook manages the state of a form input and the corresponding error message.

this hook is used in the calendar component to manage the state of the "Day" input field and any validation error messages related to it.
It provides a clean way to handle form input state and validation feedback without cluttering the component logic.
