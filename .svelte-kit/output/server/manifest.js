export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","og_image.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.b305b2a3.mjs","imports":["_app/immutable/entry/start.b305b2a3.mjs","_app/immutable/chunks/index.f30996d2.mjs","_app/immutable/chunks/singletons.8ac36ef6.mjs"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.ef7ac22f.mjs","imports":["_app/immutable/entry/app.ef7ac22f.mjs","_app/immutable/chunks/index.f30996d2.mjs"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/get-features",
				pattern: /^\/api\/get-features\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/get-features/_server.js')
			},
			{
				id: "/api/get-music-links",
				pattern: /^\/api\/get-music-links\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/get-music-links/_server.js')
			},
			{
				id: "/api/get-other-people",
				pattern: /^\/api\/get-other-people\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/get-other-people/_server.js')
			},
			{
				id: "/api/get-other",
				pattern: /^\/api\/get-other\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/get-other/_server.js')
			},
			{
				id: "/api/get-shows",
				pattern: /^\/api\/get-shows\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/get-shows/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
