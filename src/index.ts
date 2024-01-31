const worker: ExportedHandler = {
	fetch: async (request, env, ctx) => {
		return new Response("readme");
	},
};

export default worker;
