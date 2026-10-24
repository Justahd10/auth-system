import z from "zod";


const mailTemplateSchema = z.object({
  'hasTemplate': z.boolean(),
  'format': z.object({
    'subject': z.string()
  })
})

const validators = {
  'default': z.object({
    http: z.object({
      jsonSpaces: z.number(),
      urlEncoded: z.object({ extended: z.boolean() })
    }),
    shutdown: z.object({ awaitTime: z.number(), signals: z.array(z.string()) }),
    auth: z.object({
      cookies: z.object({ accessExp: z.number(), refreshExp: z.number() }),
      creds: z.object({
        password: z.object({ regex: z.string(), bcryptSalt: z.number() }),
        email: z.object({ regex: z.string() })
      }),
      tokens: z.object({
        access: z.object({
          type: z.string(),
          details: z.object({
            exp: z.number(),
            header: z.string(),
            algorithm: z.string()
          })
        }),
        refresh: z.object({
          type: z.string(),
          details: z.object({
            exp: z.number(),
            header: z.string(),
            algorithm: z.string()
          })
        }),
        mailConfirm: z.object({ type: z.string() })
      }),
      redis: z.object({
        mailConfirm: z.object({ token: z.number(), code: z.number() })
      })
    }),
    emailMsgs: z.array(
      z.object({
        template: z.string(),
        format: z.object({ subject: z.string() })
      })
    )
  })
};

export default validators;