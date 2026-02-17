import { Page, expect } from "@playwright/test";

export class LandingPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	// locators
	usernameInput = () => this.page.getByPlaceholder("Username");
	passwordInput = () => this.page.getByPlaceholder("Password");
	loginButton = () => this.page.getByRole("button", { name: "Login" });
	dashboardHeader = () => this.page.getByRole("heading", { name: "Dashboard" });

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

	async verifyLoginSuccess() {
		await expect(this.page).toHaveURL(process.env.DASHBOARD_URL!);
		await expect(this.dashboardHeader()).toBeVisible();
	}

	async loadLoginPageAndLogin(username: string, password: string) {
		await this.loadLoginPage();
		await this.inputUsername(username);
		await this.inputPassword(password);
		await this.clickLoginButton();
	}
}
