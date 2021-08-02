/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import WhatIsAnEngeriser from "./WhatIsAnEnergiser";

describe("<WhatIsAnEngeriser />", () => {
	it("should render by default", () => {
		const { debug } = render(<WhatIsAnEngeriser />);

		debug();
	});
});
