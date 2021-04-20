import { Request } from '../request';

/**
 * Attach event listeners to the document and listen for change, click, and submit events.
 */
export default function watch(): void {
	const documentOnChange = 'select[data-request], input[type=radio][data-request], input[type=checkbox][data-request], input[type=file][data-request]';

	document.addEventListener('change', (ev) => {
		if (ev.target instanceof HTMLElement && ev.target.matches(documentOnChange)) {
			Request.instance({ element: ev.target }).send();
		}
	});
	
	const documentOnClick = 'a[data-request], button[data-request], input[type=button][data-request], input[type=submit][data-request]';

	document.addEventListener('click', (ev) => {
		if (ev.target instanceof HTMLElement && ev.target.matches(documentOnClick)) {
			ev.preventDefault();

			Request.instance({ element: ev.target });

			if (ev.target.matches('[type=submit]')) {
				ev.stopPropagation();
			}
		}
	});

	document.addEventListener('submit', (ev) => {
		if (ev.target instanceof HTMLElement && ev.target.matches('[data-request]')) {
			Request.instance({element: ev.target }).send();

			ev.preventDefault();
			ev.stopPropagation();
		}
	});
}