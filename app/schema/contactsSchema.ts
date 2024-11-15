import { z } from "zod";


const contactsSchema = z.object({
  website: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .transform(value => value === "" ? undefined : value),
  twitter: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  linkedin: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  youtube: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  dribble: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  behance: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  instagram: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  twitch: z.string().trim().optional().transform(value => value === "" ? undefined : value),
  discord: z.string().trim().optional().transform(value => value === "" ? undefined : value),
});


export const formSchema = z.object({
  firstName: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  location: z.string(),
  currentlyBuilding: z.string(),
  skills: z.array(z.string()).optional(),
  showCounter: z
    .object({
      value: z.boolean(),
      handle: z.string(),
    })
    .optional(),
  showTrophies: z
    .object({
      value: z.boolean(),
      handle: z.string(),
    })
    .optional(),
  showStats: z
    .object({
      value: z.boolean(),
      theme: z.string(),
      handle: z.string(),
    })
    .optional(),
  contacts:  contactsSchema.optional(),
});

export type FormData = z.infer<typeof formSchema>;
