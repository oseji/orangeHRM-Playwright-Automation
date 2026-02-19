import { Page, expect } from "@playwright/test";
import { LandingPage } from "./landingPage";

export class DashboardPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	//locators
	dashboardHeader = () => this.page.getByRole("heading", { name: "Dashboard" });
	userDropdown = () => this.page.getByRole("img", { name: "profile picture" });
	logoutButton = () => this.page.getByRole("menuitem", { name: "Logout" });
	loginHeading = () => this.page.getByRole("heading", { name: "Login" });

	//actions
	async verifyDashboardPageHasLoaded() {
		await expect(this.page).toHaveURL(process.env.DASHBOARD_URL!);
		await expect(this.dashboardHeader()).toBeVisible();
	}

	async clickUserDropdown() {
		await this.userDropdown().click();
	}

	async clickLogoutButton() {
		await this.logoutButton().click();
	}

	async verifyUserIsLoggedOut() {
		await expect(this.page).toHaveURL(process.env.LANDING_PAGE_URL!);
		await expect(this.loginHeading()).toBeVisible();
	}

	async logoutOfAccount() {
		await this.clickUserDropdown();
		await this.clickLogoutButton();
		await this.verifyUserIsLoggedOut();
	}
}
