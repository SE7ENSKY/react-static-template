import Cookie from 'js-cookie';

const U_POSTS = 'u_posts';

export default (articleId) => {
	const cookie = Cookie.get(U_POSTS);

	if (!cookie) {
		return Cookie.set(U_POSTS, articleId);
	}

	const idsList = cookie.split('.');

	if (idsList.indexOf(`${articleId}`) === -1) idsList.push(articleId);
	if (idsList.length > 20) idsList.shift();

	return Cookie.set(U_POSTS, idsList.join('.'));
};
