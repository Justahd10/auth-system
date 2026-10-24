import z from "zod";



const clientConfigSchema = z.object({
  type: z.string(),
  connections: z.array(z.object({ name: z.string(), env: z.string() }))
})

const domainServerConfigSchema = z.object({
  enabled: z.boolean(),
  disabledMethods: z.array(z.string()),
  disabledEndpoints: z.array(z.string())
})

const validators = z.object({
  dev: z.object({
    http: z.object({ port: z.number(), rateLimit: z.number() }),
    proxy: z.object({}),
    cookiesSession: z.object({ name: z.string(), signed: z.boolean() }),
    corsFormat: z.object({
      origins: z.array(z.string()),
      credentials: z.boolean()
    }),
    clients: z.object({
      postgres: clientConfigSchema,
      redis: clientConfigSchema,
      email: clientConfigSchema
    }),
    domainServices: z.object({
      auth: domainServerConfigSchema,
      health: domainServerConfigSchema
    })
  }),
  prod: z.object({})
});

export default validators;