import { Page, expect } from "@playwright/test";

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
	personnelInfoManagementPageHeader = () =>
		this.page.getByRole("heading", { name: "PIM" });
	recruitmentPageHeader = () =>
		this.page.getByRole("heading", { name: "Recruitment" });

	//side menu locators
	personnelInfoManagementButton = () => this.page.getByText("PIM");
	recruitmentButton = () => this.page.getByText("Recruitment");

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

	async loadPersonnelInfoManagementPage() {
		await this.personnelInfoManagementButton().click();
		await expect(this.page).toHaveURL(process.env.PIM_PAGE_URL!);
		await expect(this.personnelInfoManagementPageHeader()).toBeVisible();
	}

	async loadRecruitmentPage() {
		await this.recruitmentButton().click();
		await expect(this.page).toHaveURL(process.env.RECRUITMENT_PAGE_URL!);
		await expect(this.recruitmentPageHeader()).toBeVisible();
	}
}
