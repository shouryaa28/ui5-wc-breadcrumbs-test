import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import Breadcrumbs from "@ui5/webcomponents/dist/Breadcrumbs.js";
import Button from "@ui5/webcomponents/dist/Button.js";

// Template
import TestComponentTemplate from "./generated/templates/TestComponentTemplate.lit.js";

// Styles
import TestComponentCss from "./generated/themes/TestComponent.css.js";

/**
 * @public
 */
const metadata = {
	tag: "test-component",
	properties: /** @lends demo.components.TestComponent.prototype */ {
		/**
		 * Defines the count of the component.
		 * @type { sap.ui.webc.base.types.Integer }
		 * @defaultvalue 0
		 * @public
		 */
		booleanValue: {
			type: Boolean,
			noAttribute: true,
			defaultValue: false,
		},
	},
	slots: {
	},
	events: {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>test-component</code> component is a demo component that displays some text.
 *
 * @constructor
 * @alias demo.components.TestComponent
 * @extends sap.ui.webc.base.UI5Element
 * @tagname test-component
 * @public
 */
class TestComponent extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TestComponentTemplate;
	}

	static get styles() {
		return TestComponentCss;
	}

	static async onDefine() {
		TestComponent.i18nBundle = await getI18nBundle("ui5-wc-breadcrumbs-test");
	}

	static get dependencies() {
		return [Button, Breadcrumbs];
	}

	onEnterDOM() {
		this.i = 0;
	}

	foo() {
		this.booleanValue = true;
		setTimeout(() => {
			this.booleanValue = false;
		}, 100);
	}

	createBreadcrumbsRoot() {
		this.breadcrumbsRoot = document.createElement("ui5-breadcrumbs");
		this.breadcrumbsRoot.setAttribute("separator-style", "GreaterThan");
	}

	onClick() {
		// create a breadcrumbs item parent element
		if (!this.breadcrumbsRoot) {
			this.createBreadcrumbsRoot();
		}

		this.i++;
		const item = `item${this.i}`;

		// create a breadcrumb item
		const breadcrumbsItem = document.createElement("ui5-breadcrumbs-item");
		const breadcrumbsItemText = document.createTextNode(item);
		breadcrumbsItem.appendChild(breadcrumbsItemText);
		this.breadcrumbsRoot.appendChild(breadcrumbsItem);

		// re-render after 100ms timeout
		this.foo();
	}
}

TestComponent.define();

export default TestComponent;
