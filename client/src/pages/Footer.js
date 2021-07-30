import React from "react";
import cyf_brand from "./cyf_brand.png";

function Footer() {
	return (
		<footer className="text-center text-lg-start footer">
			<div className="container-fluid">
				<div className="row">
					<div className="col-3 d-flex flex-column justify-content-evenly">
						<div className="row">
							<a>Community</a>
						</div>
						<div className="row">
							<a href="https://www.codeyourfuture.io/">Website</a>
						</div>
						<div className="row">
							<a href="https://github.com/codeyourfuture/">Github</a>
						</div>
					</div>
					<div className="col-9 d-flex justify-content-between">
						<div className="col-3 d-flex flex-column justify-content-evenly">
							<div className="row">
								<a>Social Media</a>
							</div>
							<div className="row">
								<a href="https://www.facebook.com/codeyourfuture.io">
									Facebook
								</a>
							</div>
							<div className="row">
								<a href="https://twitter.com/CodeYourFuture">Twitter</a>
							</div>
						</div>

						<div className="d-flex flex-column justify-content-evenly">
							Built by the Trainees at{" "}
							<img
								className="logo float-right"
								src={cyf_brand}
								alt="CYF Logo"
							/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
