// Needed to run in this project must import in every test file
import React from "react";
import { render } from "@testing-library/react";

// Import component
import TopEnergisers from "./TopEnergisers";

// test suite to group tests
describe("<TopEnergisers />", () => {
	// Actual test
	it("should render by default", () => {
		// Setup
		// Renders the component
		// getByTestId is a function that takes a string to look for data-testId
		const { getByTestId } = render(<TopEnergisers />);

		// Act
		// testId must be specified so the library knows what to aim for
		// if it can't find the ID it'll console log the component out
		const text = getByTestId("TopEnergisers");

		// Assert
		// Finds the Id in component and checks the text content
		expect(text).toHaveTextContent("Top Favourite Energisers");

        // test("the data is peanut butter", () => {
		// 			return expect(fetchData()).resolves.toBe(6);
		// 		});
	});
});
