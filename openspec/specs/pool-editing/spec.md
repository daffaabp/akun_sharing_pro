### Requirement: Admin can edit pool configuration
The system SHALL provide an "Edit" option in the actions menu of the pools table that opens a dialog to modify an existing pool's configuration.

#### Scenario: Open edit pool dialog
- **WHEN** Admin clicks "Edit" in the actions menu for a pool.
- **THEN** A dialog window "Edit Pool" appears, pre-populated with the pool's current `targetSeats`, `subscriptionId`, and `status`.

### Requirement: Edit dialog supports modifying pool details
The "Edit Pool" dialog SHALL allow the admin to update the pool's target seat count and related subscription link.

#### Scenario: Successfully update pool target seats
- **WHEN** Admin increases the target seats and submits the dialog.
- **THEN** The pool's `targetSeats` property is updated, the dialog closes, and the table reflects the new count.

#### Scenario: Cannot decrease seats below current members
- **WHEN** Admin attempts to reduce `targetSeats` to a number lower than the currently assigned member count.
- **THEN** The system SHALL display an error message and prevent the update.
