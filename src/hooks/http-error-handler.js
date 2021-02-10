import { useState, useEffect } from 'react';

const useHttpErrorHandler = (httpClient) => {
	const [error, setError] = useState(null);

	const reqInterceptor = httpClient.interceptors.request.use((req) => {
		// console.log('error hit request', req);
		setError(null);
		return req;
	});

	const resInterceptor = httpClient.interceptors.response.use(
		(res) => res,
		(err) => {
			// console.log('error hit response', err);
			setError(err);
		}
	);

	useEffect(() => {
		return () => {
			httpClient.interceptors.request.eject(reqInterceptor);
			httpClient.interceptors.response.eject(resInterceptor);
		};
	}, [reqInterceptor, resInterceptor]);

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [error, errorConfirmedHandler];
};
export default useHttpErrorHandler;
