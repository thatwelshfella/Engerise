// Needed to run in this project must import in every test file
import React from "react";
import { render } from "@testing-library/react";

// Import component
import Tags from "./Tags";

// test suite to group tests
describe("<Tags />", () => {
	// Actual test
	it("should render by default", () => {
		// Setup
		// Renders the component
		// getByTestId is a function that takes a string to look for data-testId
		const { getByTestId } = render(<Tags />);

		// Act
		// testId must be specified so the library knows what to aim for
		// if it can't find the ID it'll console log the component out
		const text = getByTestId("Tags");

		// Assert
		// Finds the Id in component and checks the text content
		expect(text).toHaveTextContent("Tags");

		// test("the data is peanut butter", () => {
		// 			return expect(fetchData()).resolves.toBe(6);
		// 		});
	});
});
