import { StackContext, Api, EventBus, Auth } from "sst/constructs";

export function authStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    cors: {
      allowMethods: ["ANY"],
      allowHeaders: ["Authorization"],
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
    },
  });
  auth.attach(stack, { api, prefix: "/auth" });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
