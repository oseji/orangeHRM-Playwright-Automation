import { Page, expect } from "@playwright/test";

export class PersonnelInformationManagementPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	//locators
	addEmployeeButton = () =>
		this.page.getByRole("link", { name: "Add Employee" });
	addEmployeeHeader = () =>
		this.page.getByRole("heading", { name: "Add Employee" });
	firstNameInputField = () => this.page.getByPlaceholder("First Name");
	middleNameInputField = () => this.page.getByPlaceholder("Middle Name");
	lastNameInputField = () => this.page.getByPlaceholder("Last Name");
	employeeIdInputField = () =>
		this.page
			.locator(".oxd-input-group")
			.filter({ hasText: "Employee Id" })
			.locator("input");
	saveButton = () => this.page.getByRole("button", { name: "Save" });

	//actions
	async clickAddEmployeeButton() {
		await this.addEmployeeButton().click();
	}

	async waitForAddEmployeeFormToLoad() {
		await expect(this.page).toHaveURL(process.env.ADD_EMPLOYEE_PAGE_URL!);
		await expect(this.addEmployeeHeader()).toBeVisible();
	}

	async inputFirstName(firstName: string) {
		await this.firstNameInputField().fill(firstName);
	}

	async inputMiddleName(middleName: string) {
		await this.middleNameInputField().fill(middleName);
	}

	async inputLastName(lastName: string) {
		await this.lastNameInputField().fill(lastName);
	}

	async inputEmployeeId(employeeId: string) {
		await this.employeeIdInputField().fill(employeeId);
	}

	async clickSaveButton() {
		await this.saveButton().click();
	}

	async fillAddEmployeeForm(
		firstName: string,
		middleName: string,
		lastName: string,
		employeeId: string,
	) {
		await this.waitForAddEmployeeFormToLoad();
		await this.inputFirstName(firstName);
		await this.inputMiddleName(middleName);
		await this.inputLastName(lastName);
		await this.inputEmployeeId(employeeId);
		await this.clickSaveButton();
		await expect(this.page.url()).toContain(
			process.env.EMPLOYEE_DETAILS_PAGE_URL!,
		);
	}
}
