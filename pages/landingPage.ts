import { Page, expect } from "@playwright/test";
import { DashboardPage } from "./dashboardNavigationPage";

export class LandingPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
		this.dashboardPage = new DashboardPage(this.page);
	}

	dashboardPage: DashboardPage;

	// locators
	usernameInput = () => this.page.getByPlaceholder("Username");
	passwordInput = () => this.page.getByPlaceholder("Password");
	loginButton = () => this.page.getByRole("button", { name: "Login" });
	invalidCredentialsErrorText = () =>
		this.page.locator("p", { hasText: "Invalid credentials" });

	// actions
	async loadLoginPage() {
		await this.page.goto(process.env.LANDING_PAGE_URL!);
	}

	async inputUsername(username: string) {
		await this.usernameInput().fill(username);
	}

	async inputPassword(password: string) {
		await this.passwordInput().fill(password);
	}

	async clickLoginButton() {
		await this.loginButton().click();
	}

	async loadLoginPageAndLogin(
		testType: "valid credentials" | "invalid credentials" | "empty credentials",
		username: string,
		password: string,
	) {
		await this.loadLoginPage();

		if (testType === "valid credentials") {
			await this.inputUsername(username);
			await this.inputPassword(password);
		}

		if (testType === "invalid credentials") {
			await this.inputUsername(username);
			await this.inputPassword(password);
		}

		if (testType === "empty credentials") {
			await this.inputUsername("");
			await this.inputPassword("");
		}

		await this.clickLoginButton();

		if (testType === "valid credentials") {
			await this.dashboardPage.verifyDashboardPageHasLoaded();
		}

		if (testType === "invalid credentials") {
			await expect(this.invalidCredentialsErrorText()).toBeVisible({
				timeout: 10000,
			});
		}
	}
}
