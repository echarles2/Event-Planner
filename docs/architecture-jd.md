# Architectural Layout

## Repositories
**createEventRepo:**  
This repository includes CRUD operations, such as fetchEvents(), getEventById(), and createEvent().  
It currently stores events in the eventTestData array.  

This logic is not in the component to keep data storage and data access separated from the UI elements.  
If the data source changes, it will be easier to update the code in one place without impacting the component.

This repository is being used in the addEvent function in createEventService; it is called to store newly created events.  

## Services
**createEventService:**  
This service includes the addEvent function which validates inputs from the create event form.  
The event name, date, and location fields are validated; error and success statuses are updated depending on input validity.  
It calls the createEventRepo to manage event data.  

This logic is separated from the component since it involves input validation based on business rules.  
Any changes to validation rules can be easily updated in this file.

The service is being used in the CreateEvent component (CreateEvent.tsx) to validate user inputs when forms are submitted.  

## Hooks
**useFormInput:**  
This hook handles input state, validation, and error messages.  
It has functions including onChange, validate, setValue, and SetError to manage user input and update state.   

This logic is separated from the component since it involves state logic for forms.  
It is broad enough to be used by multiple form components and prevents unnecessary, repetitive code.  

The hook is being used in the CreateEvent component (CreateEvent.tsx) to handle event name, date, location, and detail fields.  