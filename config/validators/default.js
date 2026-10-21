import z from "zod";


const mailTemplateSchema = z.object({
  'hasTemplate': z.boolean(),
  'format': z.object({
    'subject': z.string()
  })
})

const validators = {
  'default': z.object({
    'jsonSpaces': z.literal(2),
    'auth': z.object({
      'cookies': z.object({
        'cookieSession': z.literal("session"),
        'accessCookieExp': z.literal(180000),
        'refreshCookieExp': z.literal(360000)
      }).strict(),
      'creds': z.object({
        'password': z.object({
          'regex': z.literal("/^.{8,}$/"),
          'bcryptSalt': z.literal(12)
        }).strict(),
        'email': z.object({
          'regex': z.literal("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/")
        }).strict()
      }).strict(),
      'tokens': z.object({
        'access': z.object({
          'type': z.literal("jwt"),
          'details': z.object({
            'exp': z.literal(900),
            'header': z.literal("JWT"),
            'algorithm': z.literal("HS256")
          }).strict()
        }).strict(),
        'refresh': z.object({
          'type': z.literal("jwt"),
          'details': z.object({
            'exp': z.literal(3600),
            'header': z.literal("JWT"),
            'algorithm': z.literal("HS256")
          }).strict()
        }).strict(),
        'mailConfirm': z.object({
          'type': z.literal("alphanumeric")
        }).strict()
      }).strict(),
      'redis': z.object({
        'mailConfirm': z.object({
          'token': z.number(),
          'code': z.number()
        }).strict()
      }).strict()
    }).strict(),
    'middlewares': z.object({
      'auth': z.object({
        '/api/auth/register': z.array(z.string()),
        '/api/auth/login': z.array(z.string()),
        '/api/auth/me': z.array(z.string())
      }).strict()
    }).strict(),

    'email': z.record(
      z.string(), mailTemplateSchema
    )
  }).strict()
};

export default validators;