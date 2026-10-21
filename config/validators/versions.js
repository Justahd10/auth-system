import z from "zod";



const validators = {
  'dev': z.object({
    'http': z.object({
      'port': z.number(),
      'rateLimit': z.number()
    }).strict(),
    'proxy': z.record(z.string(), z.unknown()),
    'cors': z.object({
      'origins': z.array(z.string()),
      'inclueCreds': z.boolean()
    }).strict(),
    'clients': z.object({
      'database': z.object({
        'isCritical': z.boolean()
      }).strict(),
      'redis': z.object({
        'isCritical': z.boolean()
      }).strict(),
      'email': z.object({
        'isCritical': z.boolean(),
        'service': z.string()
      }).strict()
    }).strict(),
    'domainServices': z.object({
      'auth': z.object({
        'enabled': z.boolean(),
        'methods': z.array(z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"])),
        'endpoints': z.array(z.string())
      }).strict()
    }).strict(),
    'shutdown': z.object({
      'awaitTime': z.number()
    }).strict()
  }).strict(),

  'prod': z.object({}).strict(),
};

export default validators;