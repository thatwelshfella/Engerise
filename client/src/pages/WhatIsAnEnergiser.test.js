/**
 * @jest-environment jsdom
 */

// Needed to run in this project must import in every test file including line above
import React from "react";
import { render } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";

// Import component
import WhatIsAnEngeriser from "./WhatIsAnEnergiser";

// test suite to group tests
describe("<WhatIsAnEngeriser />", () => {
	// Actual test
	it("should render by default", () => {
		// Setup
		// Renders the component
		// getByTestId is a function that takes a string to look for data-testId
		const {  getByTestId } = render(<WhatIsAnEngeriser />);

		// Act
		// testId must be specified so the library knows what to aim for
		// if it can't find the ID it'll console log the component out
		const text = getByTestId("WhatIsAnEnergiser");

		// Assert
		// Finds the Id in component and checks the text content
		expect(text).toHaveTextContent("What is an Energiser? An energiser is an activity or game designed to welcome attendees and warm up the conversation among participants in a meeting or training class. Any event that requires people to comfortably interact with each other and a facilitator is an opportunity to use an icebreaker.");
	});
});


// ● Validation Warning:

//   Unknown option "coverageReporter" with value ["json", "lcov", "text", "clover"] was found. Did you mean "coverageReporters"?
//   This is probably a typing mistake. Fixing it will remove this message.

//   Configuration Documentation:
//   https://jestjs.io/docs/configuration

// ● Validation Warning:

//   Unknown option "coverageThreshold." with value {"global": {"branches": 50}} was found. Did you mean "coverageThreshold"?
//   This is probably a typing mistake. Fixing it will remove this message.

//   Configuration Documentation:
//   https://jestjs.io/docs/configuration

// ● Validation Warning:

//   Unknown option "coverageReporter" with value ["json", "lcov", "text", "clover"] was found. Did you mean "coverageReporters"?
//   This is probably a typing mistake. Fixing it will remove this message.

//   Configuration Documentation:
//   https://jestjs.io/docs/configuration

// ● Validation Warning:

//   Unknown option "coverageThreshold." with value {"global": {"branches": 50}} was found. Did you mean "coverageThreshold"?
//   This is probably a typing mistake. Fixing it will remove this message.