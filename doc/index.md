# Observable

Observable is a generic tool to send and receive events. It's a common pattern to isolate modules without forming a dependency or "coupling". By using events a large program can be broken into smaller and simpler units. Modules can be added, removed, or modified without affecting the other parts of the application.

A common practice is to split the application into a single core and multiple extensions. The core sends events any time something remarkable happens: a new item is being added, an existing item is being removed, or something is loaded from the server.

By using the observable the extensions can listen to these events and react to them. They extend the core so that the core is not aware of these modules. This is called "loose coupling".

These extensions can be custom tags (UI components) or non-UI modules.

Once the core and events are carefully designed the team members are enabled to develop the system on their own without disturbing others.